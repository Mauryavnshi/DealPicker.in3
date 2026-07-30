'use client';

import Breadcrumb from '@/components/layout/Breadcrumb';
import EmptyState from '@/components/common/EmptyState';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Comparisons() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto pt-8 md:pt-12 pb-16">
      <Breadcrumb items={[{ label: t('common.home'), href: '/' }, { label: t('pages.comparisons.title') }]} />
      <div className="mt-6 max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Editorial</div>
        <h1 className="mt-2 font-heading font-black tracking-tight text-4xl md:text-6xl">{t('pages.comparisons.title')}</h1>
      </div>
      <div className="mt-12">
        <EmptyState icon="compass" title={t('pages.comparisons.empty')} ctaLabel="Explore deals" ctaHref="/#deals" />
      </div>
    </div>
  );
}
