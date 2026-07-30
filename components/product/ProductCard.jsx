'use client';

import Link from 'next/link';
import { Star, BadgePercent, TrendingUp, Heart, Share2, ExternalLink, ShieldCheck } from 'lucide-react';
import { inr, pct } from '@/lib/format';
import { toast } from 'sonner';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/**
 * Premium product card — image, brand, title, rating, price, discount,
 * Prime badge, affiliate disclosure, View Deal button, wishlist + share.
 */
export default function ProductCard({ product }) {
  const { t } = useLanguage();
  const discount = pct(product.mrp, product.price);
  const img = product.images?.[0];
  const name = product.name || product.title || 'Untitled';
  const brand = product.brand || '';

  const share = async (e) => {
    e.preventDefault(); e.stopPropagation();
    const url = typeof window !== 'undefined' ? `${window.location.origin}/product/${product.slug}` : `/product/${product.slug}`;
    try {
      if (navigator.share) await navigator.share({ title: name, url });
      else { await navigator.clipboard.writeText(url); toast.success(t('common.copied')); }
    } catch {}
  };

  const wishlist = (e) => {
    e.preventDefault(); e.stopPropagation();
    try {
      const key = 'dp_wishlist';
      const cur = JSON.parse(localStorage.getItem(key) || '[]');
      const has = cur.includes(product.slug);
      const next = has ? cur.filter(s => s !== product.slug) : [...cur, product.slug];
      localStorage.setItem(key, JSON.stringify(next));
      toast.success(has ? 'Removed from wishlist' : 'Added to wishlist');
    } catch {}
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 card-hover hover:border-primary/50 hover:shadow-glow"
      data-testid="product-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-elevated to-secondary/40">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-muted-foreground text-xs">No image</div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-lg">
              <BadgePercent className="h-3 w-3" /> {discount}% {t('common.off')}
            </span>
          )}
          {product.trending && (
            <span className="inline-flex items-center gap-1 rounded-full bg-background/85 backdrop-blur px-2 py-1 text-[10px] font-semibold text-foreground border border-border">
              <TrendingUp className="h-3 w-3" /> {t('common.trending')}
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={wishlist}
            aria-label="Add to wishlist"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border text-foreground hover:text-primary hover:border-primary/50 transition-colors"
            data-testid="product-card-wishlist"
          >
            <Heart className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={share}
            aria-label="Share"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border text-foreground hover:text-primary hover:border-primary/50 transition-colors"
            data-testid="product-card-share"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col p-4 md:p-5 flex-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground uppercase tracking-wider">{brand}</span>
          <span className="inline-flex items-center gap-1 text-foreground/90">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-muted-foreground">({(product.reviews || 0).toLocaleString('en-IN')})</span>
          </span>
        </div>

        <h3 className="mt-2 font-semibold text-[15px] leading-snug line-clamp-2 min-h-[2.6rem]">
          {name}
        </h3>

        <div className="mt-3 flex items-baseline gap-2 font-mono">
          <span className="text-xl font-bold">{inr(product.price)}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            {t('common.affiliate_disclosure')}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 text-blue-400 px-1.5 py-0.5 font-semibold">
            {t('common.prime')}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-[filter] duration-200"
            data-testid="product-card-view-deal"
          >
            {t('common.view_deal')}
            <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
