'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductGrid from '@/components/product/ProductGrid';
import { ProductGridSkeleton } from '@/components/product/ProductSkeleton';
import EmptyState from '@/components/common/EmptyState';
import { getBrandBySlug } from '@/lib/data/brands';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function BrandPage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const brand = getBrandBySlug(slug);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (!brand) return;
    (async () => {
      const r = await fetch(`/api/products?brand=${encodeURIComponent(brand.name)}`);
      const d = await r.json();
      setProducts(Array.isArray(d) ? d : []);
    })();
  }, [brand]);

  if (!brand) return notFound();

  return (
    <div className="container mx-auto pt-8 md:pt-12 pb-16">
      <Breadcrumb items={[{ label: t('common.home'), href: '/' }, { label: 'Brands', href: '/#brands' }, { label: brand.name }]} />
      <div className="mt-6 max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Brand</div>
        <h1 className="mt-2 font-heading font-black tracking-tight text-4xl md:text-6xl">{brand.name}</h1>
      </div>
      <div className="mt-12">
        {products === null ? <ProductGridSkeleton count={8} />
          : products.length === 0 ? <EmptyState title={`No ${brand.name} deals yet`} description="We're curating hand-picked deals from this brand." ctaLabel="Explore all" ctaHref="/" />
          : <ProductGrid products={products} />}
      </div>
    </div>
  );
}
