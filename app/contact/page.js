'use client';

import { useState } from 'react';
import { Mail, Send, Instagram, Twitter, Loader2 } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (r.ok) { toast.success('Message sent. We reply within 48h.'); setForm({ name: '', email: '', message: '' }); }
      else toast.error(d.error || 'Could not send');
    } catch { toast.error('Could not send'); }
    finally { setLoading(false); }
  };

  return (
    <div className="container mx-auto pt-8 md:pt-12 pb-16">
      <Breadcrumb items={[{ label: t('common.home'), href: '/' }, { label: t('pages.contact.title') }]} />
      <div className="mt-6 max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Say hi</div>
        <h1 className="mt-2 font-heading font-black tracking-tight text-4xl md:text-6xl">{t('pages.contact.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('pages.contact.lede')}</p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <form onSubmit={submit} className="md:col-span-2 rounded-3xl border border-border bg-card p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">{t('pages.contact.name')}</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 w-full h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary/60"
                required
                data-testid="contact-name-input"
              />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">{t('pages.contact.email')}</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5 w-full h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary/60"
                required
                data-testid="contact-email-input"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">{t('pages.contact.message')}</span>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/60 resize-y"
              required
              data-testid="contact-message-input"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition disabled:opacity-70"
            data-testid="contact-submit-button"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {t('pages.contact.send')}
          </button>
        </form>

        <aside className="rounded-3xl border border-border bg-card p-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">{t('pages.contact.or')}</div>
          <a href="mailto:contact@dealpicker.in" className="mt-3 inline-flex items-center gap-2 font-heading font-bold text-lg hover:text-primary transition">
            <Mail className="h-4 w-4" /> contact@dealpicker.in
          </a>

          <div className="mt-8 text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">{t('pages.contact.follow')}</div>
          <div className="mt-3 flex items-center gap-2">
            <a href="https://www.instagram.com/dealpickerin" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary/60 transition">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://x.com/dealpickerin" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary/60 transition">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
