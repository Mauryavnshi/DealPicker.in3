'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductGrid from '@/components/product/ProductGrid';
import EmptyState from '@/components/common/EmptyState';
import { ProductGridSkeleton } from '@/components/product/ProductSkeleton';
import { useCategories } from '@/lib/hooks/useTaxonomy';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function CategoryPage() {
  const { slug } = useParams();
  const { locale, t } = useLanguage();
  const { categories, isLoading: catLoading } = useCategories();
  const [products, setProducts] = useState(null);

  const cat = categories.find(c => c.slug === slug);

  useEffect(() => {
    (async () => {
      const r = await fetch(`/api/products?category=${encodeURIComponent(slug)}`);
      const d = await r.json();
      setProducts(Array.isArray(d) ? d : []);
    })();
  }, [slug]);

  if (catLoading) {
    return <div className="container mx-auto pt-8 md:pt-12"><div className="h-10 w-1/2 rounded shimmer" /></div>;
  }

  if (!cat) {
    return (
      <div className="container mx-auto pt-16 pb-24 text-center">
        <h1 className="font-heading font-black text-4xl">Category not found</h1>
        <p className="mt-2 text-muted-foreground">This category doesn&apos;t exist.</p>
      </div>
    );
  }

  const catName = cat.name?.[locale] || cat.name?.en || cat.slug;

  return (
    <div className="container mx-auto pt-8 md:pt-12">
      <Breadcrumb
        items={[
          { label: t('common.home'), href: '/' },
          { label: t('footer.categories'), href: '/#deals' },
          { label: catName },
        ]}
      />
      <div className="mt-6 max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Category</div>
        <h1 className="mt-2 font-heading font-black tracking-tight text-4xl md:text-5xl">{catName}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{cat.description?.[locale] || cat.description?.en || ''}</p>
      </div>

      <div className="mt-10">
        {products === null ? (
          <ProductGridSkeleton count={8} />
        ) : products.length === 0 ? (
          <EmptyState
            title={locale === 'hi' ? `${catName} की डील जल्द आ रही हैं` : `No ${catName} deals yet`}
            description={locale === 'hi' ? 'हम इस श्रेणी के लिए बेहतरीन डील तैयार कर रहे हैं। बहुत जल्द वापस आइए।' : "We're curating the best deals for this category. Check back very soon."}
            ctaHref="/"
            ctaLabel={locale === 'hi' ? 'अन्य डील देखें' : 'Explore other deals'}
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
