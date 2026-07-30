'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import EmptyState from '@/components/common/EmptyState';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function BuyingGuides() {
  const { t, locale } = useLanguage();
  const [guides, setGuides] = useState(null);

  useEffect(() => {
    (async () => {
      const r = await fetch('/api/guides');
      const d = await r.json();
      setGuides(Array.isArray(d) ? d : []);
    })();
  }, []);

  return (
    <div className="container mx-auto pt-8 md:pt-12 pb-16">
      <Breadcrumb items={[{ label: t('common.home'), href: '/' }, { label: t('pages.guides.title') }]} />
      <div className="mt-6 max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Editorial</div>
        <h1 className="mt-2 font-heading font-black tracking-tight text-4xl md:text-6xl">{t('pages.guides.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('sections.guides_sub')}</p>
      </div>
      <div className="mt-12">
        {guides === null ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-40 rounded-2xl shimmer" />)}</div>
        ) : guides.length === 0 ? (
          <EmptyState icon="compass" title={t('pages.guides.empty')} ctaLabel="Explore deals" ctaHref="/#deals" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link key={g.id} href={`/buying-guides/${g.slug}`} className="group rounded-2xl border border-border bg-card overflow-hidden card-hover hover:border-primary/50">
                {g.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.cover} alt="" className="w-full h-40 object-cover" />
                ) : (
                  <div className="h-40 bg-gradient-to-br from-primary/10 to-elevated grid place-items-center">
                    <BookOpen className="h-8 w-8 text-primary/60" />
                  </div>
                )}
                <div className="p-5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary">{g.category || 'Guide'}</div>
                  <h3 className="mt-2 font-heading font-bold text-lg leading-tight">{g.content?.[locale]?.title || g.content?.en?.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{g.content?.[locale]?.excerpt || g.content?.en?.excerpt}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-primary text-xs font-semibold">Read guide <ArrowRight className="h-3 w-3" /></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
