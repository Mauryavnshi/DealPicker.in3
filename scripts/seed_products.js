/**
 * One-time seed for DealPicker products.
 *
 * Usage:
 *   node scripts/seed_products.js
 *
 * Reads content from ./seed_products_data.js and pushes every product to
 * the running Next.js server via the admin API. Uses ADMIN_EMAIL /
 * ADMIN_PASSWORD from /app/.env for the JWT login.
 */

/* eslint-disable no-console */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const BASE = process.env.SEED_BASE_URL || 'http://localhost:3000';
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;

const { PRODUCTS, EXTRA_BRANDS, MODELS } = require('./seed_products_data');

async function login() {
  const r = await fetch(`${BASE}/api/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`Login failed: ${d.error}`);
  return d.token;
}

async function api(token, method, path, body) {
  const r = await fetch(`${BASE}/api${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  let d = null;
  try { d = await r.json(); } catch {}
  return { ok: r.ok, status: r.status, data: d };
}

(async () => {
  console.log(`→ Seeding ${PRODUCTS.length} products via ${BASE}`);
  const token = await login();
  console.log('  logged in as', EMAIL);

  // 1. Ensure extra brands exist (iQOO, Brother)
  const existingBrands = (await api(token, 'GET', '/admin/brands')).data || [];
  const brandSlugs = new Set(existingBrands.map(b => b.slug));
  for (const b of EXTRA_BRANDS) {
    if (brandSlugs.has(b.slug)) { console.log(`  brand ${b.slug}: exists`); continue; }
    const r = await api(token, 'POST', '/admin/brands', b);
    console.log(`  brand ${b.slug}: ${r.ok ? 'created' : 'failed - ' + JSON.stringify(r.data)}`);
  }

  // 2. Ensure models exist (idempotent by slug)
  const existingModels = (await api(token, 'GET', '/admin/models')).data || [];
  const modelSlugs = new Set(existingModels.map(m => m.slug));
  for (const m of MODELS) {
    if (modelSlugs.has(m.slug)) { console.log(`  model ${m.slug}: exists`); continue; }
    const r = await api(token, 'POST', '/admin/models', m);
    console.log(`  model ${m.slug}: ${r.ok ? 'created' : 'failed - ' + JSON.stringify(r.data)}`);
  }

  // 3. Products — upsert by slug (delete existing then create fresh to avoid duplicates)
  const existingProducts = (await api(token, 'GET', '/admin/products')).data || [];
  const bySlug = new Map(existingProducts.map(p => [p.slug, p]));

  let created = 0, updated = 0, failed = 0;
  for (const p of PRODUCTS) {
    const existing = bySlug.get(p.slug);
    if (existing) {
      const r = await api(token, 'PUT', `/admin/products/${existing.id}`, p);
      if (r.ok) { updated++; console.log(`  product ${p.slug}: updated`); }
      else { failed++; console.log(`  product ${p.slug}: FAILED — ${JSON.stringify(r.data)}`); }
    } else {
      const r = await api(token, 'POST', '/admin/products', p);
      if (r.ok) { created++; console.log(`  product ${p.slug}: created`); }
      else { failed++; console.log(`  product ${p.slug}: FAILED — ${JSON.stringify(r.data)}`); }
    }
  }

  console.log(`\n✔ Done. Created: ${created}, Updated: ${updated}, Failed: ${failed}`);
})().catch(e => {
  console.error('SEED FAILED', e);
  process.exit(1);
});
