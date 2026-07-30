'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, Save, X, Pencil, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminShell';
import { adminFetch } from '@/lib/auth/AdminAuthContext';
import { Field, TextInput, Select } from '@/components/admin/FormControls';

const emptyRow = (categorySlug = '', brandSlug = '') => ({
  id: '', slug: '', name: '', categorySlug, brandSlug,
});

export default function AdminModels() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState({ category: '', brand: '' });

  const load = async () => {
    const [rc, rb, rm] = await Promise.all([
      adminFetch('/api/admin/categories'), adminFetch('/api/admin/brands'), adminFetch('/api/admin/models'),
    ]);
    setCategories(await rc.json());
    setBrands(await rb.json());
    setItems(await rm.json());
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (!items) return null;
    return items.filter(m =>
      (!filter.category || m.categorySlug === filter.category) &&
      (!filter.brand || m.brandSlug === filter.brand)
    );
  }, [items, filter]);

  const save = async () => {
    const isNew = !editing.id;
    if (!editing.name || !editing.brandSlug || !editing.categorySlug) { toast.error('Name, brand and category are required'); return; }
    const body = { ...editing, slug: editing.slug || `${editing.brandSlug}-${editing.name}` };
    const r = await adminFetch(
      isNew ? '/api/admin/models' : `/api/admin/models/${editing.id}`,
      { method: isNew ? 'POST' : 'PUT', body: JSON.stringify(body) },
    );
    if (!r.ok) { toast.error('Save failed'); return; }
    toast.success(isNew ? 'Model created' : 'Model updated');
    setEditing(null); load();
  };

  const remove = async (id) => {
    if (!confirm('Delete model?')) return;
    const r = await adminFetch(`/api/admin/models/${id}`, { method: 'DELETE' });
    if (r.ok) { toast.success('Deleted'); load(); }
  };

  const brandName = (slug) => brands.find(b => b.slug === slug)?.name || slug;
  const catName = (slug) => categories.find(c => c.slug === slug)?.name?.en || slug;

  return (
    <div>
      <AdminPageHeader
        eyebrow="Taxonomy"
        title="Models"
        description="A model represents a specific product line under a brand (e.g. iQOO → iQOO 15R)."
        actions={
          <button
            onClick={() => setEditing(emptyRow(filter.category, filter.brand))}
            className="inline-flex items-center gap-1.5 h-10 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110"
            data-testid="admin-models-new"
          >
            <Plus className="h-4 w-4" /> New model
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Filter className="h-3.5 w-3.5" /> Filter</div>
        <Select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })} className="max-w-[220px]">
          <option value="">All categories</option>
          {categories.map(c => <option key={c.slug} value={c.slug}>{c.name?.en}</option>)}
        </Select>
        <Select value={filter.brand} onChange={(e) => setFilter({ ...filter, brand: e.target.value })} className="max-w-[220px]">
          <option value="">All brands</option>
          {brands.map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
        </Select>
      </div>

      {filtered === null ? (
        <div className="grid gap-2">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-12 rounded-xl shimmer" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center text-sm text-muted-foreground">No models yet under this filter.</div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 px-4 py-3 bg-secondary/40 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <div>Name</div><div>Brand</div><div>Category</div><div className="text-right">Actions</div>
          </div>
          {filtered.map((m) => (
            <div key={m.id} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center px-4 py-3 border-t border-border">
              <div className="text-sm">{m.name}</div>
              <div className="text-sm text-muted-foreground">{brandName(m.brandSlug)}</div>
              <div className="text-sm text-muted-foreground">{catName(m.categorySlug)}</div>
              <div className="flex items-center gap-1 justify-end">
                <button onClick={() => setEditing({ ...m })} className="p-1.5 rounded-lg hover:bg-secondary"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => remove(m.id)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-premium">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-lg">{editing.id ? 'Edit model' : 'New model'}</h3>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded-full hover:bg-secondary"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Model name" required><TextInput value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
              <Field label="Category" required>
                <Select value={editing.categorySlug} onChange={(e) => setEditing({ ...editing, categorySlug: e.target.value })}>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.slug} value={c.slug}>{c.name?.en}</option>)}
                </Select>
              </Field>
              <Field label="Brand" required>
                <Select value={editing.brandSlug} onChange={(e) => setEditing({ ...editing, brandSlug: e.target.value })}>
                  <option value="">Select brand</option>
                  {brands.map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
                </Select>
              </Field>
              <Field label="Slug" hint="Optional — auto-generated"><TextInput value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></Field>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="h-10 px-4 rounded-full border border-border text-sm">Cancel</button>
              <button onClick={save} className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                <Save className="h-4 w-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
