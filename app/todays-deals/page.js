'use client';

import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductGrid from '@/components/product/ProductGrid';
import { ProductGridSkeleton } from '@/components/product/ProductSkeleton';
import EmptyState from '@/components/common/EmptyState';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function TodaysDealsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState(null);
  useEffect(() => {
    (async () => {
      const r = await fetch('/api/products?todaysDeal=true&limit=60');
      const d = await r.json();
      const list = Array.isArray(d) ? d : [];
      setProducts(list);
    })();
  }, []);
  return (
    <div className="container mx-auto pt-8 md:pt-12 pb-16">
      <Breadcrumb items={[{ label: t('common.home'), href: '/' }, { label: t('nav.todays_deals') }]} />
      <div className="mt-6 max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Live</div>
        <h1 className="mt-2 font-heading font-black tracking-tight text-4xl md:text-6xl">{t('nav.todays_deals')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('sections.today_sub')}</p>
      </div>
      <div className="mt-12">
        {products === null ? <ProductGridSkeleton count={8} />
          : products.length === 0 ? <EmptyState title="No deals today yet" description="Fresh deals drop every morning. Come back soon or subscribe below." ctaLabel="Home" ctaHref="/" />
          : <ProductGrid products={products} />}
      </div>
    </div>
  );
}
