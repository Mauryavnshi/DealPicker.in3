'use client';

import Link from 'next/link';
import { Instagram, Twitter, Send, ShieldCheck } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useCategories } from '@/lib/hooks/useTaxonomy';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const { t, locale } = useLanguage();
  const { categories } = useCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-card/50">
      <div className="container mx-auto pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t('footer.about')}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Verified affiliate links · No paid placements</span>
            </div>

            <div className="mt-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">
                {t('footer.social')}
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com/dealpickerin"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary/60 hover:bg-secondary transition-colors"
                  data-testid="footer-instagram-link"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com/dealpickerin"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter)"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary/60 hover:bg-secondary transition-colors"
                  data-testid="footer-twitter-link"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <span
                  aria-label="Telegram — coming soon"
                  title={t('footer.telegram_soon')}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground"
                  data-testid="footer-telegram-link"
                >
                  <Send className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="text-sm font-heading font-bold mb-4">{t('footer.categories')}</div>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 6).map(c => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {c.name?.[locale] || c.name?.en || c.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="text-sm font-heading font-bold mb-4">{t('footer.company')}</div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.about_us')}</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.contact')}</Link></li>
              <li><Link href="/buying-guides" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.buying_guides')}</Link></li>
              <li><Link href="/reviews" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.reviews')}</Link></li>
              <li><Link href="/comparisons" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.comparisons')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-sm font-heading font-bold mb-4">{t('footer.legal')}</div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/legal/affiliate-disclosure" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.affiliate_disclosure')}</Link></li>
              <li><Link href="/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link href="/legal/terms" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.terms')}</Link></li>
              <li><Link href="/legal/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.disclaimer')}</Link></li>
              <li><Link href="/legal/refund" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.refund')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {year} DealPicker.in — {t('footer.copyright')}</span>
          <span>{t('footer.made')}</span>
        </div>
      </div>
    </footer>
  );
}
