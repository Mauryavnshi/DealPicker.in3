'use client';

import Link from 'next/link';
import { Sparkles, ShieldCheck, ArrowRight, Zap, BadgePercent } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden noise">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 grid-lines pointer-events-none" />

      <div className="relative container mx-auto pt-16 md:pt-24 lg:pt-28 pb-16 md:pb-24">
        <div className="max-w-3xl animate-fade-in-up">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 py-1.5 pl-2 pr-3 text-[11px] font-semibold text-primary"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-2.5 w-2.5" />
            </span>
            <span className="uppercase tracking-widest">{t('hero.badge')}</span>
          </span>

          <h1 className="mt-6 font-heading font-black tracking-tighter leading-[0.98] text-5xl sm:text-6xl md:text-7xl lg:text-[92px]">
            {t('hero.title_a')} <span className="gradient-text">{t('hero.title_highlight')}</span> {t('hero.title_b')}
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="#deals"
              className="group inline-flex items-center gap-2 h-12 md:h-14 rounded-full bg-primary px-6 md:px-7 text-base font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition-[filter,transform] duration-300 active:scale-[0.98]"
              data-testid="hero-explore-cta"
            >
              {t('hero.cta_explore')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <div className="inline-flex items-center gap-2 h-12 md:h-14 rounded-full border border-border bg-secondary/40 px-4 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              {t('hero.verified')}
            </div>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg">
            {[
              { k: 'Daily', v: t('hero.stats.curated'), icon: Sparkles },
              { k: '10+',   v: t('hero.stats.categories'), icon: BadgePercent },
              { k: '24/7',  v: t('hero.stats.tracking'),   icon: Zap },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-border bg-card/40 p-3 sm:p-4 backdrop-blur">
                <div className="flex items-center gap-1.5 text-primary text-[10px] uppercase font-bold tracking-widest">
                  <s.icon className="h-3 w-3" /> Live
                </div>
                <div className="mt-1 font-mono text-2xl md:text-3xl font-bold tracking-tight">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
