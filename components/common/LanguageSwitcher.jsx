'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ size = 'md' }) {
  const { locale, setLocale } = useLanguage();
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 p-0.5"
      data-testid="nav-lang-toggle"
    >
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full transition-colors ${
          locale === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
        data-testid="lang-en"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale('hi')}
        aria-pressed={locale === 'hi'}
        className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full transition-colors ${
          locale === 'hi' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
        data-testid="lang-hi"
      >
        हि
      </button>
    </div>
  );
}
