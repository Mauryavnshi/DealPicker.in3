'use client';

import { BRANDS } from '@/lib/data/brands';
import { SectionHeader } from '@/components/home/CategoryGrid';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function FeaturedBrands() {
  const { t } = useLanguage();
  // Duplicate list once to fake infinite marquee
  const marquee = [...BRANDS, ...BRANDS];

  return (
    <section className="container mx-auto pt-16 md:pt-20">
      <SectionHeader eyebrow="Brands" title={t('sections.brands_title')} subtitle={t('sections.brands_sub')} />
      <div className="mt-8 relative">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {marquee.map((b, i) => (
              <div
                key={`${b.slug}-${i}`}
                className="inline-flex items-center gap-2 shrink-0 rounded-full border border-border bg-card px-5 py-3 font-heading font-bold text-lg tracking-tight text-foreground/85 hover:text-primary hover:border-primary/50 transition-colors"
                data-testid="brand-chip"
              >
                {b.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
