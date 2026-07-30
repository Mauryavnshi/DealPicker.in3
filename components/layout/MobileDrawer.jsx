'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { X, Home, Sparkles, TrendingUp, Search, Instagram, Twitter, Send, ArrowRight } from 'lucide-react';
import Logo from '@/components/common/Logo';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import ThemeToggle from '@/components/common/ThemeToggle';
import { NAV_LINKS } from '@/lib/data/categories';
import { useCategories } from '@/lib/hooks/useTaxonomy';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const SECTION_TITLE = 'text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-2';

export default function MobileDrawer({ open, onClose, onOpenSearch }) {
  const { t, locale } = useLanguage();
  const { categories } = useCategories();

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden
      />
      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-y-0 left-0 z-[56] w-[86%] max-w-[360px] bg-card border-r border-border shadow-premium
          transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
        data-testid="mobile-drawer"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <Logo compact />
          <button
            type="button"
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
            onClick={onClose}
            data-testid="mobile-drawer-close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto no-scrollbar h-[calc(100%-72px)] px-5 py-5 space-y-6">
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex-1 inline-flex items-center gap-2 h-10 rounded-full border border-border bg-secondary/60 px-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="drawer-search-button"
            >
              <Search className="h-4 w-4" />
              {t('common.search')}
            </button>
            <ThemeToggle />
          </div>

          <div>
            <div className={SECTION_TITLE}>Navigate</div>
            <nav className="space-y-1">
              <DrawerLink onClose={onClose} href="/" icon={Home} label={t('nav.home')} />
              <DrawerLink onClose={onClose} href="/todays-deals" icon={Sparkles} label={t('nav.todays_deals')} />
              <DrawerLink onClose={onClose} href="/trending" icon={TrendingUp} label={t('nav.trending')} />
            </nav>
          </div>

          <div>
            <div className={SECTION_TITLE}>{t('footer.categories')}</div>
            <nav className="grid grid-cols-2 gap-1">
              {categories.map(c => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-secondary transition-colors"
                  data-testid={`drawer-cat-${c.slug}`}
                >
                  <span className="text-foreground/90">{c.name?.[locale] || c.name?.en}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className={SECTION_TITLE}>{t('footer.quick_links')}</div>
            <nav className="space-y-1">
              {NAV_LINKS.map(l => (
                <DrawerLink key={l.href} onClose={onClose} href={l.href} label={l.label[locale] || l.label.en} />
              ))}
              <DrawerLink onClose={onClose} href="/about" label={t('nav.about')} />
              <DrawerLink onClose={onClose} href="/contact" label={t('nav.contact')} />
            </nav>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className={SECTION_TITLE}>{t('common.language')}</div>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center gap-2">
              <a href="https://www.instagram.com/dealpickerin" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-full border border-border hover:bg-secondary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://x.com/dealpickerin" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="p-2 rounded-full border border-border hover:bg-secondary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <span className="p-2 rounded-full border border-dashed border-border text-muted-foreground" aria-label="Telegram coming soon" title={t('footer.telegram_soon')}>
                <Send className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function DrawerLink({ href, label, icon: Icon, onClose }) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-secondary transition-colors"
    >
      <span className="inline-flex items-center gap-2.5">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />}
        <span>{label}</span>
      </span>
      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </Link>
  );
}
