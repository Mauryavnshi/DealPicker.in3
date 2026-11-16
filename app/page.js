'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedBrands from '@/components/home/FeaturedBrands';
import ProductSection from '@/components/home/ProductSection';
import Newsletter from '@/components/home/Newsletter';
import { ProductGridSkeleton } from '@/components/product/ProductSkeleton';
import EmptyState from '@/components/common/EmptyState';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { BadgePercent, TrendingUp, Sparkles, Zap } from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch('/api/products?limit=24');
        const d = await r.json();
        if (!cancelled) setProducts(Array.isArray(d) ? d : []);
      } catch {
        if (!cancelled) setProducts([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const isLoading = products === null;
  const list = products || [];
  const today    = list.filter(p => p.todaysDeal);
  const trending = list.filter(p => p.trending);
  const featured = list.filter(p => p.featured);

  // Same fallback the "today" section already used: if nothing has been
  // flagged for a section yet, show a slice of the full catalog instead of
  // hiding the section entirely (ProductSection renders null on an empty
  // array). Keeps all three homepage sections populated as soon as any
  // products exist, matching the original intent of the "today" section.
  const todayDisplay    = today.length    ? today    : list.slice(0, 8);
  const trendingDisplay = trending.length ? trending : list.slice(0, 8);
  const featuredDisplay = featured.length ? featured : list.slice(0, 8);

  return (
    <>
      <Hero />

      <div id="deals" />

      <CategoryGrid />

      <FeaturedBrands />

      {isLoading ? (
        <section className="container mx-auto pt-16 md:pt-20">
          <div className="mb-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Deals</div>
            <h2 className="mt-2 font-heading font-black tracking-tight text-3xl md:text-4xl">{t('sections.today_title')}</h2>
          </div>
          <ProductGridSkeleton count={8} />
        </section>
      ) : list.length === 0 ? (
        <section className="container mx-auto pt-16 md:pt-20">
          <EmptyState
            icon="search"
            title="Fresh deals coming soon"
            description="Our editors are curating the best Amazon tech deals right now. Meanwhile, explore categories and brands."
            ctaLabel="Browse categories"
            ctaHref="#deals"
          />
        </section>
      ) : (
        <>
          <ProductSection
            eyebrow="Deals"
            title={t('sections.today_title')}
            subtitle={t('sections.today_sub')}
            products={todayDisplay}
          />
          <ProductSection
            eyebrow="Trending"
            title={t('sections.trending_title')}
            subtitle={t('sections.trending_sub')}
            products={trendingDisplay}
          />
          <ProductSection
            eyebrow="Editor"
            title={t('sections.featured_title')}
            subtitle={t('sections.featured_sub')}
            products={featuredDisplay}
          />
        </>
      )}

      <Newsletter />
    </>
  );
}
