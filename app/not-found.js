'use client';

import Link from 'next/link';
import { Home, Search, Compass } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 grid-lines pointer-events-none" />
      <div className="relative text-center max-w-xl">
        <div className="font-mono text-[120px] md:text-[180px] leading-none font-black gradient-text tracking-tighter">
          {t('pages.not_found.code')}
        </div>
        <h1 className="mt-2 font-heading font-black text-3xl md:text-5xl tracking-tight">{t('pages.not_found.title')}</h1>
        <p className="mt-3 text-sm md:text-base text-muted-foreground">{t('pages.not_found.subtitle')}</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition">
            <Home className="h-4 w-4" /> {t('pages.not_found.home')}
          </Link>
          <Link href="/#deals" className="inline-flex items-center gap-2 h-11 rounded-full border border-border bg-secondary/60 px-5 text-sm hover:bg-secondary transition">
            <Search className="h-4 w-4" /> {t('pages.not_found.search')}
          </Link>
        </div>
      </div>
    </div>
  );
}
