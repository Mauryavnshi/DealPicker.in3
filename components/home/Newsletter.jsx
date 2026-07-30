'use client';

import { useState } from 'react';
import { Send, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const r = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const d = await r.json();
      if (r.ok) { toast.success(t('common.newsletter_success')); setEmail(''); }
      else toast.error(d.error || t('common.newsletter_fail'));
    } catch { toast.error(t('common.newsletter_fail')); }
    finally { setLoading(false); }
  };

  return (
    <section className="container mx-auto pt-20 md:pt-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
        <div className="absolute inset-0 hero-glow opacity-70 pointer-events-none" />
        <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
        <div className="relative p-8 md:p-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 py-1 px-3 text-[11px] font-bold uppercase tracking-widest text-primary">
            <Mail className="h-3 w-3" />
            Newsletter
          </div>
          <h2 className="mt-4 font-heading font-black tracking-tight text-3xl md:text-5xl max-w-2xl">
            {t('sections.newsletter_title')}
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl">
            {t('sections.newsletter_sub')}
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col sm:flex-row items-stretch gap-3 max-w-xl">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('common.email_placeholder')}
              className="flex-1 h-12 rounded-full border border-border bg-background px-5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
              aria-label="Email"
              data-testid="newsletter-email-input"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 h-12 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition-[filter] disabled:opacity-70 disabled:cursor-not-allowed"
              data-testid="newsletter-submit-button"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {t('common.subscribe')}
            </button>
          </form>
          <p className="mt-3 text-[11px] text-muted-foreground">
            We won&apos;t share your email. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
