'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminShell';
import { adminFetch } from '@/lib/auth/AdminAuthContext';
import { Field, TextInput, NumberInput } from '@/components/admin/FormControls';

const emptyRow = () => ({ id: '', slug: '', name: '', order: 999 });

export default function AdminBrands() {
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const r = await adminFetch('/api/admin/brands');
    if (r.ok) setItems(await r.json());
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    const isNew = !editing.id;
    const r = await adminFetch(
      isNew ? '/api/admin/brands' : `/api/admin/brands/${editing.id}`,
      { method: isNew ? 'POST' : 'PUT', body: JSON.stringify(editing) },
    );
    const d = await r.json();
    if (!r.ok) { toast.error(d.error || 'Save failed'); return; }
    toast.success(isNew ? 'Brand created' : 'Brand updated');
    setEditing(null); load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this brand?')) return;
    const r = await adminFetch(`/api/admin/brands/${id}`, { method: 'DELETE' });
    if (r.ok) { toast.success('Deleted'); load(); }
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Taxonomy"
        title="Brands"
        description="Manage the list of brands you feature across the site."
        actions={
          <button
            onClick={() => setEditing(emptyRow())}
            className="inline-flex items-center gap-1.5 h-10 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110"
            data-testid="admin-brands-new"
          >
            <Plus className="h-4 w-4" /> New brand
          </button>
        }
      />

      {items === null ? (
        <div className="grid gap-2">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-12 rounded-xl shimmer" />)}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((b) => (
            <div key={b.id} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
              <div>
                <div className="font-heading font-bold text-lg">{b.name}</div>
                <div className="text-[11px] font-mono text-muted-foreground mt-0.5">{b.slug}</div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setEditing({ ...b })} className="p-1.5 rounded-lg hover:bg-secondary"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => remove(b.id)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="col-span-full text-center text-sm text-muted-foreground py-8">No brands yet.</div>}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-premium">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-lg">{editing.id ? 'Edit brand' : 'New brand'}</h3>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded-full hover:bg-secondary"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Name" required>
                <TextInput value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value, slug: editing.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })} />
              </Field>
              <Field label="Slug" required><TextInput value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></Field>
              <Field label="Sort order"><NumberInput value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} /></Field>
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
