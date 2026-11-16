import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import {
  seedAdmin, findAdminByEmail, verifyPassword, signAdminToken,
  requireAdmin, checkLockout, recordFailedAttempt, clearAttempts,
} from '@/lib/auth/jwt';
import {
  sanitize, sanitizeMany, toNumber, toBool,
  normalizeBilingual, normalizeStringArray, normalizeBilingualArray, normalizeBilingualSpecs,
  makeId, slugify,
} from '@/lib/api/helpers';
import { CATEGORIES as DEFAULT_CATEGORIES } from '@/lib/data/categories';
import { BRANDS as DEFAULT_BRANDS } from '@/lib/data/brands';

const j = (data, status = 200) => NextResponse.json(data, { status });

// Cache only public GET responses at Vercel's CDN. Keep admin and write responses uncached.
const publicJ = (data, maxAge = 60, staleWhileRevalidate = 300) =>
  NextResponse.json(data, {
    headers: {
      'Cache-Control': `public, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
    },
  });

let _seededAdmin = false;
let _seededTaxonomy = false;

async function ensureAdminSeed() {
  if (_seededAdmin) return;
  try { await seedAdmin(); _seededAdmin = true; } catch (e) { console.error('seedAdmin failed', e); }
}

// One-time seed of default categories + brands into DB so admin panel isn't empty on first login.
async function ensureTaxonomySeed() {
  if (_seededTaxonomy) return;
  try {
    const db = await getDb();
    const cn = await db.collection('taxonomy_categories').countDocuments();
    if (cn === 0) {
      await db.collection('taxonomy_categories').insertMany(
        DEFAULT_CATEGORIES.map((c, i) => ({
          id: makeId(), slug: c.slug, name: c.name, description: c.description,
          icon: c.icon, order: i, createdAt: Date.now(),
        }))
      );
    }
    const bn = await db.collection('taxonomy_brands').countDocuments();
    if (bn === 0) {
      await db.collection('taxonomy_brands').insertMany(
        DEFAULT_BRANDS.map((b, i) => ({
          id: makeId(), slug: b.slug, name: b.name, order: i, createdAt: Date.now(),
        }))
      );
    }
    _seededTaxonomy = true;
  } catch (e) { console.error('taxonomy seed failed', e); }
}

// ---------- product normalizer ----------
function normalizeProduct(body, existing = null) {
  const name = String(body.name || body.title || existing?.name || 'Untitled').trim();
  const slug = slugify(body.slug || existing?.slug || name);
  const price = toNumber(body.price, existing?.price ?? 0);
  const mrp = toNumber(body.mrp ?? body.oldPrice, existing?.mrp ?? price);
  const rating = toNumber(body.rating, existing?.rating ?? 4.3);
  const reviews = toNumber(body.reviews ?? body.reviewCount, existing?.reviews ?? 0);
  const images = normalizeStringArray(body.images);
  return {
    id: existing?.id || makeId(),
    slug,
    name,
    title: name, // legacy alias
    brand: String(body.brand || existing?.brand || '').trim(),
    brandSlug: slugify(body.brandSlug || body.brand || existing?.brand || ''),
    category: String(body.category || existing?.category || 'mobiles').trim(),
    model: String(body.model || existing?.model || '').trim(),
    modelSlug: slugify(body.modelSlug || body.model || existing?.model || ''),
    images: images.length ? images : (existing?.images || []),
    affiliateLink: String(body.affiliateLink || existing?.affiliateLink || '#'),
    price,
    mrp,
    rating,
    reviews,
    trending: toBool(body.trending, existing?.trending ?? false),
    todaysDeal: toBool(body.todaysDeal, existing?.todaysDeal ?? false),
    featured: toBool(body.featured, existing?.featured ?? false),
    published: toBool(body.published, existing?.published ?? true),
    content: {
      en: {
        description:  String(body.content?.en?.description   ?? existing?.content?.en?.description ?? ''),
        shortReview:  String(body.content?.en?.shortReview   ?? existing?.content?.en?.shortReview ?? ''),
        pros:         normalizeStringArray(body.content?.en?.pros ?? existing?.content?.en?.pros ?? []),
        cons:         normalizeStringArray(body.content?.en?.cons ?? existing?.content?.en?.cons ?? []),
        specs:        normalizeBilingualSpecs({ en: body.content?.en?.specs ?? existing?.content?.en?.specs ?? [] }).en,
        seoTitle:     String(body.content?.en?.seoTitle       ?? existing?.content?.en?.seoTitle ?? ''),
        seoDescription: String(body.content?.en?.seoDescription ?? existing?.content?.en?.seoDescription ?? ''),
      },
      hi: {
        description:  String(body.content?.hi?.description   ?? existing?.content?.hi?.description ?? ''),
        shortReview:  String(body.content?.hi?.shortReview   ?? existing?.content?.hi?.shortReview ?? ''),
        pros:         normalizeStringArray(body.content?.hi?.pros ?? existing?.content?.hi?.pros ?? []),
        cons:         normalizeStringArray(body.content?.hi?.cons ?? existing?.content?.hi?.cons ?? []),
        specs:        normalizeBilingualSpecs({ en: body.content?.hi?.specs ?? existing?.content?.hi?.specs ?? [] }).en,
        seoTitle:     String(body.content?.hi?.seoTitle       ?? existing?.content?.hi?.seoTitle ?? ''),
        seoDescription: String(body.content?.hi?.seoDescription ?? existing?.content?.hi?.seoDescription ?? ''),
      },
    },
    createdAt: existing?.createdAt || Date.now(),
    updatedAt: Date.now(),
  };
}

async function handle(req, ctx) {
  try {
    return await handleInner(req, ctx);
  } catch (err) {
    // Never let an unhandled error fall through as an HTML/empty 500 —
    // the frontend always expects JSON back from /api/*. This also makes
    // the real cause (e.g. an unreachable MONGO_URL in production) visible
    // in Vercel's function logs instead of silently rendering empty
    // homepage sections.
    console.error('[api] unhandled error:', err);
    return j({ error: 'Server error', detail: String(err?.message || err) }, 500);
  }
}

async function handleInner(req, { params }) {
  const p = await params;
  const path = (p?.path || []).join('/');
  const method = req.method;

  // Health and token-only auth routes must not open MongoDB connections.
  if (method === 'GET' && path === 'health') return j({ ok: true, service: 'dealpicker', ts: Date.now() });

  if (method === 'GET' && path === 'auth/admin/me') {
    const payload = requireAdmin(req);
    if (!payload) return j({ error: 'Unauthorized' }, 401);
    return j({ email: payload.email, role: payload.role });
  }

  if (method === 'POST' && path === 'auth/admin/logout') return j({ ok: true });

  // Seed admin credentials and default taxonomy only during an explicit admin login,
  // never on every public API request.
  if (method === 'POST' && (path === 'auth/admin/login' || path === 'admin/login')) {
    await ensureAdminSeed();
    await ensureTaxonomySeed();
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    if (!email || !password) return j({ error: 'Email and password required' }, 400);

    const ip = req.headers.get('x-forwarded-for') || 'local';
    const identifier = `${ip}:${email}`;
    const lock = await checkLockout(identifier);
    if (lock.locked) return j({ error: 'locked', remainingMs: lock.remainingMs }, 429);

    const admin = await findAdminByEmail(email);
    if (!admin) { await recordFailedAttempt(identifier); return j({ error: 'Invalid email or password' }, 401); }
    const ok = await verifyPassword(password, admin.passwordHash);
    if (!ok) { await recordFailedAttempt(identifier); return j({ error: 'Invalid email or password' }, 401); }
    await clearAttempts(identifier);
    const token = signAdminToken({ email: admin.email });
    return j({ token, admin: { email: admin.email, role: admin.role } });
  }

  const db = await getDb();

  // ---------- public taxonomy ----------
  if (method === 'GET' && path === 'categories') {
    const items = await db.collection('taxonomy_categories').find({}).sort({ order: 1 }).toArray();
    return publicJ(sanitizeMany(items), 3600, 86400);
  }

  if (method === 'GET' && path === 'brands') {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    let query = {};
    if (category) {
      // Brands with published products in category
      const productBrands = await db.collection('products').distinct('brandSlug', { category, published: true });
      query = { slug: { $in: productBrands } };
    }
    const items = await db.collection('taxonomy_brands').find(query).sort({ order: 1 }).toArray();
    return publicJ(sanitizeMany(items), 3600, 86400);
  }

  if (method === 'GET' && path === 'models') {
    const url = new URL(req.url);
    const brand = url.searchParams.get('brand');
    const category = url.searchParams.get('category');
    const q = {};
    if (brand) q.brandSlug = brand;
    if (category) q.categorySlug = category;
    const items = await db.collection('taxonomy_models').find(q).sort({ name: 1 }).toArray();
    return publicJ(sanitizeMany(items), 3600, 86400);
  }

  // ---------- public products ----------
  if (method === 'GET' && path === 'products') {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const brand = url.searchParams.get('brand');
    const q = (url.searchParams.get('q') || '').trim();
    const limit = Math.min(60, parseInt(url.searchParams.get('limit') || '60', 10));
    const query = { published: true };
    if (category) query.category = category;
    if (brand) query.brandSlug = slugify(brand);
    if (q) {
      const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [{ name: rx }, { brand: rx }, { model: rx }, { category: rx }];
    }
    const items = await db.collection('products').find(query).sort({ createdAt: -1 }).limit(limit).toArray();
    return publicJ(sanitizeMany(items), 60, 300);
  }

  if (method === 'GET' && path.startsWith('products/')) {
    const slug = path.replace('products/', '');
    const item = await db.collection('products').findOne({ slug, published: true });
    if (!item) return j({ error: 'Not found' }, 404);
    return publicJ(sanitize(item), 60, 300);
  }

  // ---------- search ----------
  if (method === 'GET' && path === 'search') {
    const url = new URL(req.url);
    const q = (url.searchParams.get('q') || '').trim();
    if (!q) return publicJ({ products: [], brands: [], categories: [], guides: [], reviews: [] }, 30, 120);
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const products = await db.collection('products')
      .find({ published: true, $or: [{ name: rx }, { brand: rx }, { model: rx }] })
      .limit(6).toArray();
    const brandsAll = await db.collection('taxonomy_brands').find({ name: rx }).limit(5).toArray();
    const cats = await db.collection('taxonomy_categories').find({}).toArray();
    const categories = cats.filter(c => rx.test(c.name?.en || '') || rx.test(c.name?.hi || '')).slice(0, 5);
    const guides = await db.collection('guides').find({ published: true, $or: [{ 'content.en.title': rx }, { 'content.hi.title': rx }] }).limit(4).toArray();
    return publicJ({
      products: sanitizeMany(products),
      brands: sanitizeMany(brandsAll),
      categories: sanitizeMany(categories),
      guides: sanitizeMany(guides),
      reviews: [],
    }, 30, 120);
  }

  // ---------- public reviews ----------
  if (method === 'GET' && path === 'reviews') {
    const items = await db.collection('reviews').find({ published: true }).sort({ createdAt: -1 }).toArray();
    return publicJ(sanitizeMany(items), 300, 1800);
  }
  if (method === 'GET' && path.startsWith('reviews/')) {
    const slug = path.replace('reviews/', '');
    const item = await db.collection('reviews').findOne({ slug, published: true });
    if (!item) return j({ error: 'Not found' }, 404);
    return publicJ(sanitize(item), 300, 1800);
  }

  // ---------- public guides ----------
  if (method === 'GET' && path === 'guides') {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const q = { published: true };
    if (category) q.category = category;
    const items = await db.collection('guides').find(q).sort({ createdAt: -1 }).toArray();
    return publicJ(sanitizeMany(items), 300, 1800);
  }
  if (method === 'GET' && path.startsWith('guides/')) {
    const slug = path.replace('guides/', '');
    const item = await db.collection('guides').findOne({ slug, published: true });
    if (!item) return j({ error: 'Not found' }, 404);
    return publicJ(sanitize(item), 300, 1800);
  }

  // ---------- newsletter ----------
  if (method === 'POST' && path === 'newsletter/subscribe') {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || '').trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return j({ error: 'Invalid email' }, 400);
    await db.collection('newsletter').updateOne(
      { email },
      { $setOnInsert: { email, createdAt: Date.now() }, $set: { lastAt: Date.now() } },
      { upsert: true },
    );
    return j({ ok: true });
  }

  // ---------- contact ----------
  if (method === 'POST' && path === 'contact') {
    const body = await req.json().catch(() => ({}));
    if (!body.email || !body.message) return j({ error: 'Missing fields' }, 400);
    await db.collection('contact_submissions').insertOne({
      id: makeId(), name: body.name || '', email: String(body.email).toLowerCase(),
      message: String(body.message), createdAt: Date.now(),
    });
    return j({ ok: true });
  }

  // ============================================================
  // ADMIN ROUTES (all guarded)
  // ============================================================
  const admin = requireAdmin(req);
  const adminRoute = path.startsWith('admin/');

  if (adminRoute && !admin) return j({ error: 'Unauthorized' }, 401);

  // ---------- admin: stats ----------
  if (method === 'GET' && path === 'admin/stats') {
    const [productsTotal, productsPublished, categoriesTotal, brandsTotal, modelsTotal, reviewsTotal, guidesTotal, newsletterTotal] = await Promise.all([
      db.collection('products').countDocuments(),
      db.collection('products').countDocuments({ published: true }),
      db.collection('taxonomy_categories').countDocuments(),
      db.collection('taxonomy_brands').countDocuments(),
      db.collection('taxonomy_models').countDocuments(),
      db.collection('reviews').countDocuments(),
      db.collection('guides').countDocuments(),
      db.collection('newsletter').countDocuments(),
    ]);
    const recent = await db.collection('products').find({}).sort({ createdAt: -1 }).limit(5).toArray();
    return j({
      products: { total: productsTotal, published: productsPublished, drafts: productsTotal - productsPublished },
      categories: categoriesTotal, brands: brandsTotal, models: modelsTotal,
      reviews: reviewsTotal, guides: guidesTotal, newsletter: newsletterTotal,
      recentProducts: sanitizeMany(recent),
    });
  }

  // ---------- admin: categories ----------
  if (path === 'admin/categories') {
    if (method === 'GET') {
      const items = await db.collection('taxonomy_categories').find({}).sort({ order: 1 }).toArray();
      return j(sanitizeMany(items));
    }
    if (method === 'POST') {
      const b = await req.json();
      const doc = {
        id: makeId(),
        slug: slugify(b.slug || b.name?.en || b.name || ''),
        name: normalizeBilingual(b.name),
        description: normalizeBilingual(b.description),
        icon: String(b.icon || 'ShoppingBag'),
        order: toNumber(b.order, 999),
        createdAt: Date.now(),
      };
      if (!doc.slug) return j({ error: 'Slug required' }, 400);
      const existing = await db.collection('taxonomy_categories').findOne({ slug: doc.slug });
      if (existing) return j({ error: 'Slug exists' }, 409);
      await db.collection('taxonomy_categories').insertOne(doc);
      return j(sanitize(doc));
    }
  }
  if (path.startsWith('admin/categories/')) {
    const id = path.replace('admin/categories/', '');
    if (method === 'PUT') {
      const b = await req.json();
      const upd = {};
      if (b.name !== undefined) upd.name = normalizeBilingual(b.name);
      if (b.description !== undefined) upd.description = normalizeBilingual(b.description);
      if (b.icon !== undefined) upd.icon = String(b.icon);
      if (b.slug !== undefined) upd.slug = slugify(b.slug);
      if (b.order !== undefined) upd.order = toNumber(b.order);
      await db.collection('taxonomy_categories').updateOne({ id }, { $set: upd });
      const updated = await db.collection('taxonomy_categories').findOne({ id });
      return j(sanitize(updated));
    }
    if (method === 'DELETE') {
      await db.collection('taxonomy_categories').deleteOne({ id });
      return j({ ok: true });
    }
  }

  // ---------- admin: brands ----------
  if (path === 'admin/brands') {
    if (method === 'GET') {
      const items = await db.collection('taxonomy_brands').find({}).sort({ order: 1, name: 1 }).toArray();
      return j(sanitizeMany(items));
    }
    if (method === 'POST') {
      const b = await req.json();
      const doc = {
        id: makeId(),
        slug: slugify(b.slug || b.name || ''),
        name: String(b.name || ''),
        order: toNumber(b.order, 999),
        createdAt: Date.now(),
      };
      if (!doc.slug || !doc.name) return j({ error: 'Slug and name required' }, 400);
      const existing = await db.collection('taxonomy_brands').findOne({ slug: doc.slug });
      if (existing) return j({ error: 'Slug exists' }, 409);
      await db.collection('taxonomy_brands').insertOne(doc);
      return j(sanitize(doc));
    }
  }
  if (path.startsWith('admin/brands/')) {
    const id = path.replace('admin/brands/', '');
    if (method === 'PUT') {
      const b = await req.json();
      const upd = {};
      if (b.name !== undefined) upd.name = String(b.name);
      if (b.slug !== undefined) upd.slug = slugify(b.slug);
      if (b.order !== undefined) upd.order = toNumber(b.order);
      await db.collection('taxonomy_brands').updateOne({ id }, { $set: upd });
      const updated = await db.collection('taxonomy_brands').findOne({ id });
      return j(sanitize(updated));
    }
    if (method === 'DELETE') {
      await db.collection('taxonomy_brands').deleteOne({ id });
      return j({ ok: true });
    }
  }

  // ---------- admin: models ----------
  if (path === 'admin/models') {
    if (method === 'GET') {
      const items = await db.collection('taxonomy_models').find({}).sort({ name: 1 }).toArray();
      return j(sanitizeMany(items));
    }
    if (method === 'POST') {
      const b = await req.json();
      const doc = {
        id: makeId(),
        slug: slugify(b.slug || `${b.brandSlug}-${b.name}` || ''),
        name: String(b.name || ''),
        brandSlug: slugify(b.brandSlug || ''),
        categorySlug: slugify(b.categorySlug || ''),
        createdAt: Date.now(),
      };
      if (!doc.name || !doc.brandSlug || !doc.categorySlug) return j({ error: 'Name, brandSlug and categorySlug required' }, 400);
      await db.collection('taxonomy_models').insertOne(doc);
      return j(sanitize(doc));
    }
  }
  if (path.startsWith('admin/models/')) {
    const id = path.replace('admin/models/', '');
    if (method === 'PUT') {
      const b = await req.json();
      const upd = {};
      ['name', 'slug', 'brandSlug', 'categorySlug'].forEach(k => {
        if (b[k] !== undefined) upd[k] = (k === 'name') ? String(b[k]) : slugify(b[k]);
      });
      await db.collection('taxonomy_models').updateOne({ id }, { $set: upd });
      const updated = await db.collection('taxonomy_models').findOne({ id });
      return j(sanitize(updated));
    }
    if (method === 'DELETE') {
      await db.collection('taxonomy_models').deleteOne({ id });
      return j({ ok: true });
    }
  }

  // ---------- admin: products ----------
  if (path === 'admin/products') {
    if (method === 'GET') {
      const items = await db.collection('products').find({}).sort({ createdAt: -1 }).toArray();
      return j(sanitizeMany(items));
    }
    if (method === 'POST') {
      const b = await req.json();
      const doc = normalizeProduct(b);
      // ensure unique slug
      const clash = await db.collection('products').findOne({ slug: doc.slug });
      if (clash) doc.slug = `${doc.slug}-${doc.id.slice(0, 6)}`;
      await db.collection('products').insertOne(doc);
      return j(sanitize(doc));
    }
  }
  if (path.startsWith('admin/products/')) {
    const rest = path.replace('admin/products/', '');
    const [id, sub] = rest.split('/');
    const existing = await db.collection('products').findOne({ id });
    if (!existing) return j({ error: 'Not found' }, 404);

    if (sub === 'publish' && method === 'POST') {
      const b = await req.json().catch(() => ({}));
      const published = toBool(b.published, !existing.published);
      await db.collection('products').updateOne({ id }, { $set: { published, updatedAt: Date.now() } });
      return j({ ...sanitize(existing), published });
    }

    if (method === 'GET')    return j(sanitize(existing));
    if (method === 'PUT') {
      const b = await req.json();
      const doc = normalizeProduct(b, existing);
      await db.collection('products').updateOne({ id }, { $set: doc });
      return j(sanitize(doc));
    }
    if (method === 'DELETE') {
      await db.collection('products').deleteOne({ id });
      return j({ ok: true });
    }
  }

  // ---------- admin: reviews ----------
  if (path === 'admin/reviews') {
    if (method === 'GET') return j(sanitizeMany(await db.collection('reviews').find({}).sort({ createdAt: -1 }).toArray()));
    if (method === 'POST') {
      const b = await req.json();
      const doc = {
        id: makeId(),
        slug: slugify(b.slug || b.title?.en || 'review'),
        productSlug: String(b.productSlug || ''),
        rating: toNumber(b.rating, 0),
        published: toBool(b.published, true),
        cover: String(b.cover || ''),
        title: normalizeBilingual(b.title),
        content: {
          en: { body: String(b.content?.en?.body || '') },
          hi: { body: String(b.content?.hi?.body || '') },
        },
        createdAt: Date.now(), updatedAt: Date.now(),
      };
      await db.collection('reviews').insertOne(doc);
      return j(sanitize(doc));
    }
  }
  if (path.startsWith('admin/reviews/')) {
    const id = path.replace('admin/reviews/', '');
    if (method === 'PUT') {
      const b = await req.json();
      const upd = { updatedAt: Date.now() };
      ['slug', 'productSlug', 'cover'].forEach(k => { if (b[k] !== undefined) upd[k] = String(b[k]); });
      if (b.rating !== undefined) upd.rating = toNumber(b.rating);
      if (b.published !== undefined) upd.published = toBool(b.published);
      if (b.title !== undefined) upd.title = normalizeBilingual(b.title);
      if (b.content !== undefined) upd.content = {
        en: { body: String(b.content?.en?.body || '') },
        hi: { body: String(b.content?.hi?.body || '') },
      };
      await db.collection('reviews').updateOne({ id }, { $set: upd });
      return j(sanitize(await db.collection('reviews').findOne({ id })));
    }
    if (method === 'DELETE') { await db.collection('reviews').deleteOne({ id }); return j({ ok: true }); }
  }

  // ---------- admin: guides ----------
  if (path === 'admin/guides') {
    if (method === 'GET') return j(sanitizeMany(await db.collection('guides').find({}).sort({ createdAt: -1 }).toArray()));
    if (method === 'POST') {
      const b = await req.json();
      const doc = {
        id: makeId(),
        slug: slugify(b.slug || b.title?.en || 'guide'),
        category: String(b.category || ''),
        cover: String(b.cover || ''),
        published: toBool(b.published, true),
        content: {
          en: {
            title: String(b.content?.en?.title || ''),
            excerpt: String(b.content?.en?.excerpt || ''),
            body: String(b.content?.en?.body || ''),
          },
          hi: {
            title: String(b.content?.hi?.title || ''),
            excerpt: String(b.content?.hi?.excerpt || ''),
            body: String(b.content?.hi?.body || ''),
          },
        },
        createdAt: Date.now(), updatedAt: Date.now(),
      };
      await db.collection('guides').insertOne(doc);
      return j(sanitize(doc));
    }
  }
  if (path.startsWith('admin/guides/')) {
    const id = path.replace('admin/guides/', '');
    if (method === 'PUT') {
      const b = await req.json();
      const upd = { updatedAt: Date.now() };
      ['slug', 'category', 'cover'].forEach(k => { if (b[k] !== undefined) upd[k] = String(b[k]); });
      if (b.published !== undefined) upd.published = toBool(b.published);
      if (b.content !== undefined) upd.content = {
        en: {
          title: String(b.content?.en?.title || ''),
          excerpt: String(b.content?.en?.excerpt || ''),
          body: String(b.content?.en?.body || ''),
        },
        hi: {
          title: String(b.content?.hi?.title || ''),
          excerpt: String(b.content?.hi?.excerpt || ''),
          body: String(b.content?.hi?.body || ''),
        },
      };
      await db.collection('guides').updateOne({ id }, { $set: upd });
      return j(sanitize(await db.collection('guides').findOne({ id })));
    }
    if (method === 'DELETE') { await db.collection('guides').deleteOne({ id }); return j({ ok: true }); }
  }

  return j({ error: 'Route not found', path }, 404);
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const DELETE = handle;
export const PATCH = handle;
