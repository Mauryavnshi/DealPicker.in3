'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { inr } from '@/lib/format';

/**
 * Full-screen search overlay with instant suggestions.
 * Opens from the navbar search icon (mobile + desktop).
 */
export default function SearchOverlay({ open, onClose }) {
  const { t, locale } = useLanguage();
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ products: [], brands: [], categories: [] });
  const [active, setActive] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = 'hidden';
    } else {
      setQ(''); setResults({ products: [], brands: [], categories: [] });
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!q.trim()) { setResults({ products: [], brands: [], categories: [] }); return; }
    const ctl = new AbortController();
    const id = setTimeout(async () => {
      try {
        setLoading(true);
        const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: ctl.signal });
        const d = await r.json();
        setResults(d);
      } catch {} finally { setLoading(false); }
    }, 180);
    return () => { clearTimeout(id); ctl.abort(); };
  }, [q]);

  if (!open) return null;

  const flat = [
    ...results.products.map(p => ({ type: 'product', href: `/product/${p.slug}`, label: p.title, meta: `${p.brand} · ${inr(p.price)}` })),
    ...results.brands.map(b => ({ type: 'brand', href: `/brand/${b.slug}`, label: b.name, meta: 'Brand' })),
    ...results.categories.map(c => ({ type: 'category', href: `/category/${c.slug}`, label: c.name[locale] || c.name.en, meta: 'Category' })),
  ];

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(flat.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(0, a - 1)); }
    else if (e.key === 'Enter' && active >= 0 && flat[active]) {
      window.location.href = flat[active].href;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md animate-fade-in-up" role="dialog" aria-modal="true">
      <div className="container mx-auto px-4 pt-6">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-premium">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(-1); }}
            onKeyDown={onKeyDown}
            placeholder={t('common.search_placeholder')}
            className="flex-1 bg-transparent outline-none text-lg placeholder:text-muted-foreground"
            data-testid="nav-search-input"
          />
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground transition"
            data-testid="nav-search-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 max-w-3xl">
          {!q.trim() && (
            <p className="text-sm text-muted-foreground">Type to search products, brands and categories.</p>
          )}
          {q.trim() && flat.length === 0 && !loading && (
            <p className="text-sm text-muted-foreground">{t('common.no_results')} for “{q}”.</p>
          )}
          {flat.length > 0 && (
            <ul className="divide-y divide-border rounded-2xl border border-border bg-card/50 overflow-hidden">
              {flat.map((r, i) => (
                <li key={`${r.type}-${r.href}-${i}`}>
                  <Link
                    href={r.href}
                    onClick={onClose}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center gap-4 px-4 py-3 transition-colors ${
                      active === i ? 'bg-secondary' : 'hover:bg-secondary/60'
                    }`}
                    data-testid="nav-search-result"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-primary/10 text-primary min-w-[70px] text-center">
                      {r.type}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{r.label}</div>
                      <div className="text-xs text-muted-foreground truncate">{r.meta}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
