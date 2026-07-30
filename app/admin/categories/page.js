'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminShell';
import { adminFetch } from '@/lib/auth/AdminAuthContext';
import { Field, TextInput, TextArea, NumberInput } from '@/components/admin/FormControls';

const emptyRow = () => ({
  id: '', slug: '', name: { en: '', hi: '' }, description: { en: '', hi: '' },
  icon: 'ShoppingBag', order: 999,
});

export default function AdminCategories() {
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const r = await adminFetch('/api/admin/categories');
    if (r.ok) setItems(await r.json());
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    const isNew = !editing.id;
    const body = JSON.stringify(editing);
    const r = await adminFetch(
      isNew ? '/api/admin/categories' : `/api/admin/categories/${editing.id}`,
      { method: isNew ? 'POST' : 'PUT', body },
    );
    const d = await r.json();
    if (!r.ok) { toast.error(d.error || 'Save failed'); return; }
    toast.success(isNew ? 'Category created' : 'Category updated');
    setEditing(null); load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this category?')) return;
    const r = await adminFetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    if (r.ok) { toast.success('Deleted'); load(); }
    else toast.error('Delete failed');
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Taxonomy"
        title="Categories"
        description="Top-level product categories. These power the homepage grid, navigation and site sitemap."
        actions={
          <button
            onClick={() => setEditing(emptyRow())}
            className="inline-flex items-center gap-1.5 h-10 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110"
            data-testid="admin-categories-new"
          >
            <Plus className="h-4 w-4" /> New category
          </button>
        }
      />

      {items === null ? (
        <div className="grid gap-2">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-14 rounded-xl shimmer" />)}</div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_100px_60px_auto] gap-3 px-4 py-3 bg-secondary/40 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <div>Name (EN)</div><div>Name (HI)</div><div>Slug</div><div>Order</div><div className="text-right">Actions</div>
          </div>
          {items.map((c) => (
            <div key={c.id} className="grid grid-cols-[1fr_1fr_100px_60px_auto] gap-3 items-center px-4 py-3 border-t border-border">
              <div className="text-sm truncate">{c.name?.en}</div>
              <div className="text-sm truncate text-muted-foreground">{c.name?.hi || '—'}</div>
              <div className="text-xs font-mono text-muted-foreground truncate">{c.slug}</div>
              <div className="text-xs font-mono text-muted-foreground">{c.order}</div>
              <div className="flex items-center gap-2 justify-end">
                <button onClick={() => setEditing({ ...c })} className="p-1.5 rounded-lg hover:bg-secondary" aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => remove(c.id)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10" aria-label="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No categories.</div>}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-premium">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-lg">{editing.id ? 'Edit category' : 'New category'}</h3>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded-full hover:bg-secondary"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name (English)" required>
                  <TextInput value={editing.name?.en || ''} onChange={(e) => setEditing({ ...editing, name: { ...editing.name, en: e.target.value } })} />
                </Field>
                <Field label="Name (Hindi)">
                  <TextInput value={editing.name?.hi || ''} onChange={(e) => setEditing({ ...editing, name: { ...editing.name, hi: e.target.value } })} />
                </Field>
              </div>
              <Field label="Slug" required hint="lowercase, dashes-only">
                <TextInput value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Icon (lucide name)" hint="e.g. Smartphone, Laptop">
                  <TextInput value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} />
                </Field>
                <Field label="Sort order"><NumberInput value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} /></Field>
              </div>
              <Field label="Description (English)">
                <TextArea rows={2} value={editing.description?.en || ''} onChange={(e) => setEditing({ ...editing, description: { ...editing.description, en: e.target.value } })} />
              </Field>
              <Field label="Description (Hindi)">
                <TextArea rows={2} value={editing.description?.hi || ''} onChange={(e) => setEditing({ ...editing, description: { ...editing.description, hi: e.target.value } })} />
              </Field>
            </div>
            <div className="mt-6 flex items-center justify-end gap-2">
              <button onClick={() => setEditing(null)} className="h-10 px-4 rounded-full border border-border text-sm hover:bg-secondary">Cancel</button>
              <button onClick={save} className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:brightness-110">
                <Save className="h-4 w-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
