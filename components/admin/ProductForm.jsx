'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, ExternalLink, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminShell';
import { adminFetch } from '@/lib/auth/AdminAuthContext';
import { Field, TextInput, NumberInput, TextArea, Select, Toggle, ListEditor, SpecEditor, BilingualTabs } from '@/components/admin/FormControls';
import { inr, pct, slugify } from '@/lib/format';

const emptyProduct = () => ({
  slug: '',
  name: '',
  category: '',
  brand: '',
  brandSlug: '',
  model: '',
  modelSlug: '',
  images: [],
  affiliateLink: '',
  price: 0,
  mrp: 0,
  rating: 4.3,
  reviews: 0,
  trending: false,
  todaysDeal: false,
  featured: false,
  published: true,
  content: {
    en: { description: '', shortReview: '', pros: [], cons: [], specs: [], seoTitle: '', seoDescription: '' },
    hi: { description: '', shortReview: '', pros: [], cons: [], specs: [], seoTitle: '', seoDescription: '' },
  },
});

/**
 * ProductForm: reused by both /admin/products/new and /admin/products/[id].
 */
export default function ProductForm({ productId }) {
  const router = useRouter();
  const isEdit = !!productId;
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyProduct());
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [tab, setTab] = useState('en');

  useEffect(() => {
    (async () => {
      const [rc, rb, rm] = await Promise.all([
        adminFetch('/api/admin/categories'),
        adminFetch('/api/admin/brands'),
        adminFetch('/api/admin/models'),
      ]);
      setCategories(await rc.json());
      setBrands(await rb.json());
      setModels(await rm.json());
      if (isEdit) {
        const rp = await adminFetch(`/api/admin/products/${productId}`);
        if (rp.ok) setForm({ ...emptyProduct(), ...(await rp.json()) });
        else toast.error('Product not found');
        setLoading(false);
      }
    })();
  }, [isEdit, productId]);

  const availableModels = useMemo(
    () => models.filter(m => (!form.brandSlug || m.brandSlug === form.brandSlug) && (!form.category || m.categorySlug === form.category)),
    [models, form.brandSlug, form.category]
  );

  const setContent = (locale, key, value) =>
    setForm(f => ({ ...f, content: { ...f.content, [locale]: { ...f.content[locale], [key]: value } } }));

  const onBrandChange = (slug) => {
    const b = brands.find(x => x.slug === slug);
    setForm(f => ({ ...f, brandSlug: slug, brand: b?.name || '', model: '', modelSlug: '' }));
  };
  const onModelChange = (slug) => {
    const m = models.find(x => x.slug === slug);
    setForm(f => ({ ...f, modelSlug: slug, model: m?.name || '' }));
  };

  const save = async () => {
    if (!form.name || !form.brand || !form.category) {
      toast.error('Name, brand and category are required'); return;
    }
    if (!form.slug) form.slug = slugify(`${form.brand}-${form.name}`);
    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/products/${productId}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';
      const r = await adminFetch(url, { method, body: JSON.stringify(form) });
      const d = await r.json();
      if (!r.ok) { toast.error(d.error || 'Save failed'); return; }
      toast.success(isEdit ? 'Product updated' : 'Product created');
      router.push(`/admin/products/${d.id}`);
    } finally { setSaving(false); }
  };

  const remove = async () => {
    if (!confirm('Delete this product?')) return;
    const r = await adminFetch(`/api/admin/products/${productId}`, { method: 'DELETE' });
    if (r.ok) { toast.success('Deleted'); router.push('/admin/products'); }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground py-10">Loading product…</div>;
  }

  const discount = pct(form.mrp, form.price);

  return (
    <div>
      <AdminPageHeader
        back="/admin/products"
        eyebrow={isEdit ? 'Edit product' : 'New product'}
        title={form.name || (isEdit ? 'Untitled' : 'Add a new product')}
        description="All fields are editable. English and Hindi content live side-by-side so your language switch works everywhere."
        actions={
          <div className="flex items-center gap-2">
            {isEdit && (
              <a href={`/product/${form.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 h-10 rounded-full border border-border bg-secondary/60 px-4 text-sm hover:bg-secondary transition">
                <ExternalLink className="h-4 w-4" /> View public
              </a>
            )}
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-1.5 h-10 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 disabled:opacity-70"
              data-testid="admin-product-save"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Main body */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading font-bold text-lg mb-4">Core</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Product name" required className="sm:col-span-2">
                <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} data-testid="admin-product-name" />
              </Field>
              <Field label="Category" required>
                <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select</option>
                  {categories.map(c => <option key={c.slug} value={c.slug}>{c.name?.en}</option>)}
                </Select>
              </Field>
              <Field label="Brand" required>
                <Select value={form.brandSlug} onChange={(e) => onBrandChange(e.target.value)}>
                  <option value="">Select</option>
                  {brands.map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
                </Select>
              </Field>
              <Field label="Model" hint="Optional — pick from taxonomy or type manually">
                {availableModels.length > 0 ? (
                  <Select value={form.modelSlug} onChange={(e) => onModelChange(e.target.value)}>
                    <option value="">Select model</option>
                    {availableModels.map(m => <option key={m.slug} value={m.slug}>{m.name}</option>)}
                  </Select>
                ) : (
                  <TextInput value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value, modelSlug: slugify(e.target.value) })} placeholder="e.g. Pixel 10" />
                )}
              </Field>
              <Field label="Slug" hint="URL — auto-generated if empty">
                <TextInput value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder={slugify(`${form.brand}-${form.name}`)} />
              </Field>
              <Field label="Affiliate link" required className="sm:col-span-2">
                <TextInput type="url" value={form.affiliateLink} onChange={(e) => setForm({ ...form, affiliateLink: e.target.value })} placeholder="https://amzn.to/..." />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading font-bold text-lg mb-4">Pricing</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Field label="Current price (₹)" required><NumberInput value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></Field>
              <Field label="Old / MRP (₹)"><NumberInput value={form.mrp} onChange={(e) => setForm({ ...form, mrp: Number(e.target.value) })} /></Field>
              <Field label="Rating (0-5)"><NumberInput step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} /></Field>
              <Field label="Review count"><NumberInput value={form.reviews} onChange={(e) => setForm({ ...form, reviews: Number(e.target.value) })} /></Field>
            </div>
            {discount > 0 && (
              <p className="mt-3 text-xs text-emerald-400">Live discount: <span className="font-semibold">-{discount}%</span> ({inr(form.mrp - form.price)} off)</p>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading font-bold text-lg mb-4">Images</h3>
            <Field label="Image URLs" hint="One URL per line — first image is the primary">
              <ListEditor value={form.images} onChange={(v) => setForm({ ...form, images: v })} placeholder="https://…/image1.jpg" />
            </Field>
            {form.images?.[0] && (
              <div className="mt-3 h-32 w-32 rounded-xl overflow-hidden border border-border bg-elevated">
                <img src={form.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h3 className="font-heading font-bold text-lg">Content</h3>
              <BilingualTabs value={tab} onChange={setTab} />
            </div>
            <div className="space-y-4">
              <Field label={`Short description (${tab.toUpperCase()})`}>
                <TextArea rows={3} value={form.content[tab].description} onChange={(e) => setContent(tab, 'description', e.target.value)} />
              </Field>
              <Field label={`Detailed review (${tab.toUpperCase()})`} hint="Paragraphs of professional analysis">
                <TextArea rows={8} value={form.content[tab].shortReview} onChange={(e) => setContent(tab, 'shortReview', e.target.value)} />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label={`Pros (${tab.toUpperCase()})`} hint="One per line">
                  <ListEditor value={form.content[tab].pros} onChange={(v) => setContent(tab, 'pros', v)} placeholder={'Great battery\nBright display'} />
                </Field>
                <Field label={`Cons (${tab.toUpperCase()})`} hint="One per line">
                  <ListEditor value={form.content[tab].cons} onChange={(v) => setContent(tab, 'cons', v)} placeholder={'Slow charging\nNo IP rating'} />
                </Field>
              </div>
              <Field label={`Specifications (${tab.toUpperCase()})`}>
                <SpecEditor value={form.content[tab].specs} onChange={(v) => setContent(tab, 'specs', v)} />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h3 className="font-heading font-bold text-lg">SEO</h3>
              <BilingualTabs value={tab} onChange={setTab} />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Field label={`SEO title (${tab.toUpperCase()})`} hint="55–65 characters ideal">
                <TextInput value={form.content[tab].seoTitle} onChange={(e) => setContent(tab, 'seoTitle', e.target.value)} />
              </Field>
              <Field label={`Meta description (${tab.toUpperCase()})`} hint="150–160 characters">
                <TextArea rows={2} value={form.content[tab].seoDescription} onChange={(e) => setContent(tab, 'seoDescription', e.target.value)} />
              </Field>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-4 self-start">
          <section className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-muted-foreground">Publish</h3>
            <Toggle checked={form.published} onChange={(v) => setForm({ ...form, published: v })} label="Published" hint="Visible on the public site" />
            <Toggle checked={form.todaysDeal} onChange={(v) => setForm({ ...form, todaysDeal: v })} label="Today's Deal" />
            <Toggle checked={form.trending}   onChange={(v) => setForm({ ...form, trending: v })}   label="Trending" />
            <Toggle checked={form.featured}   onChange={(v) => setForm({ ...form, featured: v })}   label="Featured pick" />
          </section>

          {isEdit && (
            <section className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5">
              <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-rose-400">Danger zone</h3>
              <p className="mt-1 text-xs text-muted-foreground">Deletion is permanent.</p>
              <button
                onClick={remove}
                className="mt-3 inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-rose-500/40 text-rose-300 hover:bg-rose-500/10 text-sm"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete product
              </button>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
