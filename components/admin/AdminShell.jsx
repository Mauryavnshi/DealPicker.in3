'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, FolderTree, Tag, Layers, Star, BookOpen,
  LogOut, ChevronLeft, Menu, X, ArrowUpRight,
} from 'lucide-react';
import { useState } from 'react';
import Logo from '@/components/common/Logo';
import { useAdminAuth } from '@/lib/auth/AdminAuthContext';

const NAV = [
  { href: '/admin',            label: 'Dashboard',   icon: LayoutDashboard, end: true },
  { href: '/admin/products',   label: 'Products',    icon: Package },
  { href: '/admin/categories', label: 'Categories',  icon: FolderTree },
  { href: '/admin/brands',     label: 'Brands',      icon: Tag },
  { href: '/admin/models',     label: 'Models',      icon: Layers },
  { href: '/admin/reviews',    label: 'Reviews',     icon: Star },
  { href: '/admin/guides',     label: 'Buying Guides', icon: BookOpen },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const { admin, logout } = useAdminAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar (mobile) */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b border-border bg-card/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-secondary" onClick={() => setOpen(true)} aria-label="Open admin menu">
            <Menu className="h-5 w-5" />
          </button>
          <Logo compact />
        </div>
        <span className="text-[11px] text-muted-foreground truncate max-w-[160px]">{admin?.email}</span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 lg:sticky lg:top-0 lg:h-screen bg-card border-r border-border transition-transform duration-300 ${
            open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex items-center justify-between h-16 px-5 border-b border-border">
            <Logo />
            <button className="lg:hidden p-1.5 rounded-full hover:bg-secondary" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-5 pt-5 pb-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-2">Signed in</div>
            <div className="rounded-xl border border-border bg-secondary/50 p-3">
              <div className="text-sm font-medium truncate">{admin?.email}</div>
              <div className="text-[11px] uppercase text-primary font-bold tracking-wider mt-0.5">{admin?.role}</div>
            </div>
          </div>

          <nav className="px-3 pb-6 space-y-0.5">
            <div className="px-2 pt-2 pb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Manage</div>
            {NAV.map(({ href, label, icon: Icon, end }) => {
              const active = end ? pathname === href : pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? 'bg-primary/12 text-primary'
                      : 'text-foreground/85 hover:bg-secondary hover:text-foreground'
                  }`}
                  data-testid={`admin-nav-${href.split('/').pop() || 'dashboard'}`}
                >
                  <Icon className={`h-4 w-4 ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                  <span className="flex-1">{label}</span>
                </Link>
              );
            })}

            <div className="px-2 pt-6 pb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Site</div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground/85 hover:bg-secondary hover:text-foreground transition-colors"
            >
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              Open public site
            </Link>

            <button
              onClick={logout}
              className="mt-2 w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-rose-400/90 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
              data-testid="admin-logout-button"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </nav>
        </aside>

        {/* Backdrop */}
        {open && <div className="fixed inset-0 z-30 lg:hidden bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />}

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="px-4 md:px-8 lg:px-10 py-6 md:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export function AdminPageHeader({ eyebrow, title, description, actions, back }) {
  const router = useRouter();
  return (
    <header className="mb-8">
      {back && (
        <button onClick={() => router.push(back)} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-3">
          <ChevronLeft className="h-3.5 w-3.5" /> Back
        </button>
      )}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {eyebrow && <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">{eyebrow}</div>}
          <h1 className="mt-2 font-heading font-black tracking-tight text-3xl md:text-4xl">{title}</h1>
          {description && <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{description}</p>}
        </div>
        {actions}
      </div>
    </header>
  );
}
