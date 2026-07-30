'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function GuideDetail() {
  const { slug } = useParams();
  const { locale, t } = useLanguage();
  const [guide, setGuide] = useState(undefined);

  useEffect(() => {
    (async () => {
      const r = await fetch(`/api/guides/${slug}`);
      if (r.status === 404) { setGuide(null); return; }
      setGuide(await r.json());
    })();
  }, [slug]);

  if (guide === undefined) return <div className="container mx-auto py-16"><div className="h-8 w-1/2 rounded shimmer" /></div>;
  if (guide === null) return notFound();

  const c = guide.content?.[locale] || guide.content?.en || {};
  return (
    <div className="container mx-auto pt-8 md:pt-12 pb-16 max-w-3xl">
      <Breadcrumb items={[{ label: t('common.home'), href: '/' }, { label: t('pages.guides.title'), href: '/buying-guides' }, { label: c.title }]} />
      <div className="mt-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Guide{guide.category ? ` · ${guide.category}` : ''}</div>
        <h1 className="mt-2 font-heading font-black tracking-tight text-4xl md:text-5xl">{c.title}</h1>
        {c.excerpt && <p className="mt-4 text-lg text-muted-foreground">{c.excerpt}</p>}
      </div>
      {guide.cover && <img src={guide.cover} alt="" className="mt-8 w-full rounded-2xl border border-border" />}
      <article className="mt-8 whitespace-pre-line leading-relaxed text-foreground/90">{c.body}</article>
    </div>
  );
}
