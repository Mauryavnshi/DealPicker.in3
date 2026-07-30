'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Pencil, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminShell';
import { adminFetch } from '@/lib/auth/AdminAuthContext';
import { Field, TextInput, NumberInput, TextArea, Toggle, BilingualTabs } from '@/components/admin/FormControls';

const emptyRow = () => ({
  slug: '', productSlug: '', cover: '', rating: 0, published: true,
  title: { en: '', hi: '' },
  content: { en: { body: '' }, hi: { body: '' } },
});

export default function AdminReviews() {
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null);
  const [tab, setTab] = useState('en');

  const load = async () => {
    const r = await adminFetch('/api/admin/reviews');
    if (r.ok) setItems(await r.json());
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    const isNew = !editing.id;
    const r = await adminFetch(isNew ? '/api/admin/reviews' : `/api/admin/reviews/${editing.id}`, {
      method: isNew ? 'POST' : 'PUT', body: JSON.stringify(editing),
    });
    if (!r.ok) { toast.error('Save failed'); return; }
    toast.success(isNew ? 'Review created' : 'Review updated');
    setEditing(null); load();
  };

  const remove = async (id) => {
    if (!confirm('Delete review?')) return;
    const r = await adminFetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
    if (r.ok) { toast.success('Deleted'); load(); }
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Editorial"
        title="Reviews"
        description="Long-form reviews with English and Hindi bodies. Optional productSlug attaches a review to a product."
        actions={
          <button onClick={() => setEditing(emptyRow())} className="inline-flex items-center gap-1.5 h-10 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-glow" data-testid="admin-reviews-new">
            <Plus className="h-4 w-4" /> New review
          </button>
        }
      />
      {items === null ? (
        <div className="grid gap-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 rounded-xl shimmer" />)}</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center text-sm text-muted-foreground">No reviews yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-heading font-bold truncate">{r.title?.en || 'Untitled'}</div>
                  <div className="mt-1 text-xs text-muted-foreground truncate">
                    {r.productSlug || 'Standalone'} · Rating {r.rating}
                  </div>
                </div>
                <span className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${r.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{r.published ? 'Live' : 'Draft'}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => setEditing({ ...r })} className="inline-flex items-center gap-1 h-8 px-3 rounded-full border border-border text-xs hover:bg-secondary"><Pencil className="h-3 w-3" /> Edit</button>
                <button onClick={() => remove(r.id)} className="inline-flex items-center gap-1 h-8 px-3 rounded-full border border-border text-xs text-rose-400 hover:bg-rose-500/10"><Trash2 className="h-3 w-3" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center overflow-y-auto" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-premium my-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-lg">{editing.id ? 'Edit review' : 'New review'}</h3>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded-full hover:bg-secondary"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Slug"><TextInput value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></Field>
                <Field label="Product slug (optional)"><TextInput value={editing.productSlug} onChange={(e) => setEditing({ ...editing, productSlug: e.target.value })} /></Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Cover image URL"><TextInput value={editing.cover} onChange={(e) => setEditing({ ...editing, cover: e.target.value })} /></Field>
                <Field label="Rating"><NumberInput step="0.1" min="0" max="5" value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} /></Field>
              </div>
              <div className="flex items-center justify-between">
                <Toggle checked={editing.published} onChange={(v) => setEditing({ ...editing, published: v })} label="Published" />
                <BilingualTabs value={tab} onChange={setTab} />
              </div>
              <Field label={`Title (${tab.toUpperCase()})`}>
                <TextInput value={editing.title?.[tab] || ''} onChange={(e) => setEditing({ ...editing, title: { ...editing.title, [tab]: e.target.value } })} />
              </Field>
              <Field label={`Body (${tab.toUpperCase()})`}>
                <TextArea rows={8} value={editing.content?.[tab]?.body || ''} onChange={(e) => setEditing({ ...editing, content: { ...editing.content, [tab]: { ...editing.content?.[tab], body: e.target.value } } })} />
              </Field>
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
