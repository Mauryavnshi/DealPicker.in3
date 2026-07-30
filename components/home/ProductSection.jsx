'use client';

import ProductGrid from '@/components/product/ProductGrid';
import { SectionHeader } from '@/components/home/CategoryGrid';
import EmptyState from '@/components/common/EmptyState';

export default function ProductSection({ eyebrow, title, subtitle, products, emptyLabel, showEmpty = false }) {
  if (!products?.length && !showEmpty) return null;
  return (
    <section className="container mx-auto pt-16 md:pt-20">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="mt-8">
        {products?.length ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState variant="minimal" title={emptyLabel || 'No deals yet in this section'} />
        )}
      </div>
    </section>
  );
}
