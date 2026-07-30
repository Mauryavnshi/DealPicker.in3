'use client';

import Breadcrumb from '@/components/layout/Breadcrumb';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/**
 * Shared legal page shell used by /legal/* routes.
 */
export default function LegalPage({ tKey }) {
  const { t } = useLanguage();
  const title = t(`legal.${tKey}.title`);
  const body = t(`legal.${tKey}.body`);
  return (
    <div className="container mx-auto pt-8 md:pt-12 pb-16 max-w-3xl">
      <Breadcrumb items={[{ label: t('common.home'), href: '/' }, { label: t('footer.legal'), href: '/legal/affiliate-disclosure' }, { label: title }]} />
      <div className="mt-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Legal</div>
        <h1 className="mt-2 font-heading font-black tracking-tight text-4xl md:text-5xl">{title}</h1>
      </div>
      <div className="mt-8 prose prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
        {body}
      </div>
      <p className="mt-10 text-xs text-muted-foreground">Last updated: January 2026</p>
    </div>
  );
}
