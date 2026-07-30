'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Pencil, Eye, EyeOff, Filter, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminShell';
import { adminFetch } from '@/lib/auth/AdminAuthContext';
import { Select, TextInput } from '@/components/admin/FormControls';
import { inr, pct } from '@/lib/format';

export default function AdminProductsList() {
  const [items, setItems] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filter, setFilter] = useState({ q: '', category: '', brand: '', status: '' });

  const load = async () => {
    const [rp, rc, rb] = await Promise.all([
      adminFetch('/api/admin/products'),
      adminFetch('/api/admin/categories'),
      adminFetch('/api/admin/brands'),
    ]);
    setItems(await rp.json());
    setCategories(await rc.json());
    setBrands(await rb.json());
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (!items) return null;
    const q = filter.q.trim().toLowerCase();
    return items.filter(p =>
      (!filter.category || p.category === filter.category) &&
      (!filter.brand || p.brandSlug === filter.brand) &&
      (!filter.status || (filter.status === 'live' ? p.published : !p.published)) &&
      (!q || [p.name, p.brand, p.model, p.slug].some(x => (x || '').toLowerCase().includes(q)))
    );
  }, [items, filter]);

  const togglePublish = async (p) => {
    const r = await adminFetch(`/api/admin/products/${p.id}/publish`, {
      method: 'POST', body: JSON.stringify({ published: !p.published }),
    });
    if (r.ok) { toast.success(!p.published ? 'Published' : 'Unpublished'); load(); }
    else toast.error('Failed');
  };

  const remove = async (p) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const r = await adminFetch(`/api/admin/products/${p.id}`, { method: 'DELETE' });
    if (r.ok) { toast.success('Deleted'); load(); }
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Catalog"
        title="Products"
        description="Every deal on DealPicker lives here. Publish, unpublish, edit and delete without leaving this table."
        actions={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 h-10 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110"
            data-testid="admin-products-new"
          >
            <Plus className="h-4 w-4" /> New product
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <TextInput placeholder="Search name, brand or slug" value={filter.q} onChange={(e) => setFilter({ ...filter, q: e.target.value })} />
        </div>
        <Select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })} className="max-w-[180px]">
          <option value="">All categories</option>
          {categories.map(c => <option key={c.slug} value={c.slug}>{c.name?.en}</option>)}
        </Select>
        <Select value={filter.brand} onChange={(e) => setFilter({ ...filter, brand: e.target.value })} className="max-w-[180px]">
          <option value="">All brands</option>
          {brands.map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
        </Select>
        <Select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })} className="max-w-[160px]">
          <option value="">Any status</option>
          <option value="live">Live</option>
          <option value="draft">Draft</option>
        </Select>
      </div>

      {filtered === null ? (
        <div className="grid gap-2">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-16 rounded-xl shimmer" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-sm text-muted-foreground">No products match your filters.</p>
          <Link href="/admin/products/new" className="mt-4 inline-flex items-center gap-1.5 h-10 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-glow">
            <Plus className="h-4 w-4" /> Add your first product
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-secondary/40">
              <tr className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-left">
                <th className="px-4 py-3 w-[42%]">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-elevated overflow-hidden shrink-0">
                        {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{p.brand} · {p.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">
                    <div className="font-mono">{inr(p.price)}</div>
                    {p.mrp > p.price && <div className="text-[11px] text-muted-foreground line-through">{inr(p.mrp)}</div>}
                    {pct(p.mrp, p.price) > 0 && <div className="text-[10px] text-emerald-400 font-semibold">-{pct(p.mrp, p.price)}%</div>}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublish(p)} className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${p.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {p.published ? <><Eye className="h-3 w-3" /> Live</> : <><EyeOff className="h-3 w-3" /> Draft</>}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <Link href={`/product/${p.slug}`} target="_blank" className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground" aria-label="View public"><ExternalLink className="h-3.5 w-3.5" /></Link>
                      <Link href={`/admin/products/${p.id}`} className="p-1.5 rounded-lg hover:bg-secondary" aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></Link>
                      <button onClick={() => remove(p)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
