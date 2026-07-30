'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Loader2, Mail, KeyRound, ShieldCheck, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, forward to /admin (placeholder route)
    const token = typeof window !== 'undefined' ? localStorage.getItem('dp_admin_token') : null;
    if (!token) return;
    (async () => {
      try {
        const r = await fetch('/api/auth/admin/me', { headers: { Authorization: `Bearer ${token}` } });
        if (r.ok) router.push('/admin');
      } catch {}
    })();
  }, [router]);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const r = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pwd }),
      });
      const d = await r.json();
      if (r.status === 429) { toast.error(t('pages.admin.locked')); return; }
      if (!r.ok) { toast.error(d.error || t('pages.admin.error')); return; }
      localStorage.setItem('dp_admin_token', d.token);
      // Also set cookie for future SSR checks
      document.cookie = `dp_admin=${encodeURIComponent(d.token)}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
      toast.success(t('pages.admin.signed_in'));
      router.push('/admin');
    } catch (err) {
      toast.error(t('pages.admin.error'));
    } finally { setLoading(false); }
  };

  return (
    <div className="relative min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 grid-lines pointer-events-none" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to site
        </Link>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-md shadow-premium p-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-heading font-black text-2xl tracking-tight">{t('pages.admin.title')}</h1>
              <p className="text-xs text-muted-foreground">{t('pages.admin.subtitle')}</p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4" autoComplete="off">
            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">{t('pages.admin.email')}</span>
              <div className="mt-1.5 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dealpicker.in"
                  className="w-full h-11 rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary/60"
                  data-testid="admin-login-email-input"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">{t('pages.admin.password')}</span>
              <div className="mt-1.5 relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary/60"
                  data-testid="admin-login-password-input"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-glow hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
              data-testid="admin-login-submit-button"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              {t('pages.admin.signin')}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-[11px] text-muted-foreground">
            Restricted area. All access is logged. Contact <span className="text-foreground">contact@dealpicker.in</span> for issues.
          </div>
        </div>
      </div>
    </div>
  );
}
