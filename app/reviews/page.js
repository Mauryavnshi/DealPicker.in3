'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import EmptyState from '@/components/common/EmptyState';
import { Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Reviews() {
  const { t, locale } = useLanguage();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    (async () => {
      const r = await fetch('/api/reviews');
      const d = await r.json();
      setReviews(Array.isArray(d) ? d : []);
    })();
  }, []);

  return (
    <div className="container mx-auto pt-8 md:pt-12 pb-16">
      <Breadcrumb items={[{ label: t('common.home'), href: '/' }, { label: t('pages.reviews.title') }]} />
      <div className="mt-6 max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Editorial</div>
        <h1 className="mt-2 font-heading font-black tracking-tight text-4xl md:text-6xl">{t('pages.reviews.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('sections.reviews_sub')}</p>
      </div>
      <div className="mt-12">
        {reviews === null ? (
          <div className="grid gap-3 sm:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 rounded-2xl shimmer" />)}</div>
        ) : reviews.length === 0 ? (
          <EmptyState icon="inbox" title={t('pages.reviews.empty')} ctaLabel="Explore deals" ctaHref="/#deals" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <Link key={r.id} href={r.productSlug ? `/product/${r.productSlug}` : '#'} className="group rounded-2xl border border-border bg-card p-6 card-hover hover:border-primary/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Review</span>
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {r.rating}</span>
                </div>
                <h3 className="mt-3 font-heading font-bold text-lg">{r.title?.[locale] || r.title?.en}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{r.content?.[locale]?.body || r.content?.en?.body}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-primary text-xs font-semibold">Read <ArrowRight className="h-3 w-3" /></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
