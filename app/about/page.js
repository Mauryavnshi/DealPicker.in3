'use client';

import { Sparkles, ShieldCheck, Target, Compass } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  const items = [
    { icon: Target,      title: t('pages.about.mission_title'),      body: t('pages.about.mission') },
    { icon: Compass,     title: t('pages.about.vision_title'),       body: t('pages.about.vision') },
    { icon: Sparkles,    title: t('pages.about.why_title'),          body: t('pages.about.why') },
    { icon: ShieldCheck, title: t('pages.about.transparency_title'), body: t('pages.about.transparency') },
  ];
  return (
    <div className="container mx-auto pt-8 md:pt-12 pb-16">
      <Breadcrumb items={[{ label: t('common.home'), href: '/' }, { label: t('pages.about.title') }]} />
      <div className="mt-6 max-w-3xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">DealPicker</div>
        <h1 className="mt-2 font-heading font-black tracking-tight text-4xl md:text-6xl">{t('pages.about.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('pages.about.lede')}</p>
      </div>
      <div className="mt-14 grid md:grid-cols-2 gap-5">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border border-border bg-card p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-heading font-bold text-xl">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
