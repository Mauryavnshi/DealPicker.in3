'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { useCategories } from '@/lib/hooks/useTaxonomy';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function CategoryGrid() {
  const { t, locale } = useLanguage();
  const { categories } = useCategories();
  return (
    <section className="container mx-auto pt-14 md:pt-20">
      <SectionHeader
        eyebrow="Categories"
        title={t('sections.categories_title')}
        subtitle={t('sections.categories_sub')}
      />

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {categories.map((c) => {
          const Icon = Icons[c.icon] || Icons.ShoppingBag;
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 card-hover hover:border-primary/50 hover:shadow-glow"
              data-testid={`category-card-${c.slug}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading font-bold text-base tracking-tight">
                  {c.name?.[locale] || c.name?.en || c.slug}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {c.description?.[locale] || c.description?.en || ''}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">{eyebrow}</div>
        )}
        <h2 className="mt-2 font-heading font-black tracking-tight text-3xl md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
