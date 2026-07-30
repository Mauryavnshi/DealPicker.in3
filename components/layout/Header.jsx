'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, Search, Lock } from 'lucide-react';
import Logo from '@/components/common/Logo';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import ThemeToggle from '@/components/common/ThemeToggle';
import MobileDrawer from '@/components/layout/MobileDrawer';
import SearchOverlay from '@/components/layout/SearchOverlay';
import { NAV_LINKS } from '@/lib/data/categories';
import { useCategories } from '@/lib/hooks/useTaxonomy';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Header() {
  const { t, locale } = useLanguage();
  const { categories } = useCategories();
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const displayCategories = categories.slice(0, 5);

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-shadow ${scrolled ? 'shadow-premium' : ''}`}>
        <div className="absolute inset-0 glass" />
        <div className="relative container mx-auto flex items-center gap-3 h-16 md:h-[72px]">
          {/* mobile hamburger */}
          <button
            type="button"
            className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-secondary transition"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            data-testid="nav-hamburger"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <Logo />
          </div>

          {/* desktop centre nav */}
          <nav className="hidden lg:flex items-center gap-1 mx-4">
            {displayCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="px-3 py-2 text-sm rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                data-testid={`nav-cat-${c.slug}`}
              >
                {c.name?.[locale] || c.name?.en || c.slug}
              </Link>
            ))}
            <span className="mx-2 h-4 w-px bg-border" aria-hidden />
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                data-testid={`nav-link-${l.href.replace('/', '')}`}
              >
                {l.label[locale] || l.label.en}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearch(true)}
              aria-label={t('common.search')}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary/60 text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
              data-testid="nav-search-open"
            >
              <Search className="h-4 w-4" />
            </button>

            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <Link
              href="/admin/login"
              className="hidden md:inline-flex items-center gap-1.5 h-9 rounded-full border border-border bg-secondary/60 px-3 text-sm text-foreground/90 hover:text-foreground hover:bg-secondary transition-colors"
              data-testid="nav-admin-link"
            >
              <Lock className="h-3.5 w-3.5" />
              {t('common.admin')}
            </Link>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} onOpenSearch={() => { setDrawer(false); setSearch(true); }} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
