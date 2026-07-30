'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, FolderTree, Tag, Layers, Star, BookOpen, Mail, Rocket, Plus, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminShell';
import { adminFetch } from '@/lib/auth/AdminAuthContext';
import { inr } from '@/lib/format';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    (async () => {
      const r = await adminFetch('/api/admin/stats');
      if (r.ok) setStats(await r.json());
    })();
  }, []);

  const cards = stats ? [
    { label: 'Published products', value: stats.products.published, icon: Package,     href: '/admin/products', accent: 'text-emerald-400' },
    { label: 'Drafts',              value: stats.products.drafts,    icon: Package,     href: '/admin/products', accent: 'text-amber-400' },
    { label: 'Categories',          value: stats.categories,         icon: FolderTree,  href: '/admin/categories' },
    { label: 'Brands',              value: stats.brands,             icon: Tag,         href: '/admin/brands' },
    { label: 'Models',              value: stats.models,             icon: Layers,      href: '/admin/models' },
    { label: 'Buying guides',       value: stats.guides,             icon: BookOpen,    href: '/admin/guides' },
    { label: 'Reviews',             value: stats.reviews,            icon: Star,        href: '/admin/reviews' },
    { label: 'Newsletter subs',     value: stats.newsletter,         icon: Mail,        href: '#' },
  ] : [];

  return (
    <div>
      <AdminPageHeader
        eyebrow="Admin"
        title="Dashboard"
        description="A single glance at your storefront: catalog counts, drafts and the most recent products you added."
        actions={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 h-10 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110"
            data-testid="dashboard-new-product-button"
          >
            <Plus className="h-4 w-4" /> New product
          </Link>
        }
      />

      {!stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl shimmer" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cards.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group rounded-2xl border border-border bg-card p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <c.icon className={`h-4 w-4 ${c.accent || 'text-muted-foreground'}`} />
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="mt-4 font-mono text-3xl font-bold tracking-tight">{c.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{c.label}</div>
              </Link>
            ))}
          </div>

          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-xl">Recent products</h2>
              <Link href="/admin/products" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            {stats.recentProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
                <Rocket className="h-6 w-6 mx-auto text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">No products yet. Add your first one to bring the site to life.</p>
                <Link
                  href="/admin/products/new"
                  className="mt-4 inline-flex items-center gap-1.5 h-10 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110"
                >
                  <Plus className="h-4 w-4" /> Add product
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl border border-border overflow-hidden">
                {stats.recentProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/admin/products/${p.id}`}
                    className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg bg-elevated overflow-hidden shrink-0">
                      {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{p.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{p.brand} · {p.category}</div>
                    </div>
                    <div className="font-mono text-sm text-right">{inr(p.price)}</div>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${p.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {p.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {p.published ? 'Live' : 'Draft'}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
