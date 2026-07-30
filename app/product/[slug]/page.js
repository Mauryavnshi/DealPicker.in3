'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, BadgePercent, ShieldCheck, Truck, ExternalLink, Check, X, ShoppingBag, ArrowLeft, Share2 } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductGrid from '@/components/product/ProductGrid';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { inr, pct } from '@/lib/format';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const { t, locale } = useLanguage();

  const [product, setProduct] = useState(undefined);
  const [related, setRelated] = useState([]);
  const [mainImg, setMainImg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/products/${slug}`);
        if (r.status === 404) { setProduct(null); return; }
        const d = await r.json();
        setProduct(d);
        setMainImg(d.images?.[0] || '');
        if (d.category) {
          const rr = await fetch(`/api/products?category=${encodeURIComponent(d.category)}&limit=8`);
          const dd = await rr.json();
          setRelated((dd || []).filter(x => x.slug !== d.slug).slice(0, 4));
        }
      } catch { setProduct(null); }
    })();
  }, [slug]);

  if (product === undefined) {
    return (
      <div className="container mx-auto pt-8 md:pt-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square rounded-2xl shimmer" />
          <div className="space-y-4">
            <div className="h-5 w-1/3 rounded shimmer" />
            <div className="h-8 w-4/5 rounded shimmer" />
            <div className="h-6 w-1/3 rounded shimmer" />
            <div className="h-12 w-2/3 rounded-full shimmer" />
          </div>
        </div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="container mx-auto pt-16 pb-24 text-center">
        <h1 className="font-heading font-black text-4xl">Product not found</h1>
        <p className="mt-2 text-muted-foreground">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="mt-6 inline-flex items-center gap-1.5 h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">
          {t('common.back_home')}
        </Link>
      </div>
    );
  }

  const name = product.name || product.title || 'Untitled';
  const discount = pct(product.mrp, product.price);
  const c = product.content?.[locale] || {};
  const cFallback = product.content?.en || {};
  const desc = c.description || cFallback.description;
  const shortReview = c.shortReview || cFallback.shortReview;
  const pros = (c.pros && c.pros.length ? c.pros : cFallback.pros) || [];
  const cons = (c.cons && c.cons.length ? c.cons : cFallback.cons) || [];
  const specs = (c.specs && c.specs.length ? c.specs : cFallback.specs) || [];

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: name, url });
      else { await navigator.clipboard.writeText(url); toast.success(t('common.copied')); }
    } catch {}
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    image: product.images,
    brand: { '@type': 'Brand', name: product.brand },
    description: cFallback.description || '',
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews || 0,
    } : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      url: product.affiliateLink,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="container mx-auto pt-6 md:pt-10 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>

      <Breadcrumb
        items={[
          { label: t('common.home'), href: '/' },
          { label: product.category, href: `/category/${product.category}` },
          { label: name },
        ]}
      />

      <div className="mt-8 grid md:grid-cols-2 gap-8 lg:gap-14">
        <div>
          <div className="relative rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-elevated to-secondary/40 aspect-square">
            {mainImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mainImg} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full grid place-items-center text-muted-foreground">No image</div>
            )}
            {discount > 0 && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-lg">
                <BadgePercent className="h-3 w-3" /> {discount}% {t('common.off')}
              </span>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImg(img)}
                  className={`h-20 w-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    mainImg === img ? 'border-primary' : 'border-border hover:border-primary/40'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs">{product.brand}</span>
            {product.model && <span className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs">{product.model}</span>}
            <span className="inline-flex items-center rounded-full bg-blue-500/10 text-blue-400 px-3 py-1 text-xs font-semibold">{t('common.prime')}</span>
          </div>

          <h1 className="mt-4 font-heading font-black tracking-tight text-2xl md:text-4xl leading-[1.1]">{name}</h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{product.rating}</span>
            </span>
            <span className="text-muted-foreground">
              {(product.reviews || 0).toLocaleString('en-IN')} {t('common.reviews_count')}
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3 font-mono">
            <span className="text-4xl md:text-5xl font-bold">{inr(product.price)}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">{inr(product.mrp)}</span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                  {t('common.save')} {discount}%
                </span>
              </>
            )}
          </div>

          {desc && <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{desc}</p>}

          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            {t('common.affiliate_disclosure')} — DealPicker earns a commission at no extra cost to you.
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-flex items-center gap-2 h-12 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
              data-testid="pdp-buy-amazon"
            >
              <ShoppingBag className="h-4 w-4" /> {t('common.buy_amazon')}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button onClick={share} className="inline-flex items-center gap-2 h-12 rounded-full border border-border bg-secondary/60 px-4 text-sm text-foreground/90 hover:bg-secondary transition-colors" data-testid="pdp-share">
              <Share2 className="h-4 w-4" /> {t('common.share')}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
            <FeatureChip icon={Truck} label={locale === 'hi' ? 'तेज़ डिलीवरी' : 'Fast delivery'} />
            <FeatureChip icon={ShieldCheck} label={locale === 'hi' ? 'Amazon वारंटी' : 'Amazon warranty'} />
            <FeatureChip icon={BadgePercent} label={locale === 'hi' ? 'सत्यापित डील' : 'Verified deal'} />
          </div>

          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="overview">{locale === 'hi' ? 'समीक्षा' : 'Review'}</TabsTrigger>
              <TabsTrigger value="specs">{locale === 'hi' ? 'स्पेक्स' : 'Specs'}</TabsTrigger>
              <TabsTrigger value="proscons">{locale === 'hi' ? 'पक्ष व विपक्ष' : 'Pros & Cons'}</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              {shortReview ? (
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{shortReview}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No review yet.</p>
              )}
            </TabsContent>
            <TabsContent value="specs" className="mt-4">
              <div className="rounded-xl border border-border overflow-hidden">
                {specs.map((row, i) => (
                  <div key={i} className={`grid grid-cols-3 gap-4 p-3 text-sm ${i % 2 ? 'bg-secondary/50' : ''}`}>
                    <span className="text-muted-foreground">{row.key}</span>
                    <span className="col-span-2 font-medium">{row.value}</span>
                  </div>
                ))}
                {!specs.length && <div className="p-6 text-sm text-muted-foreground">No specs available.</div>}
              </div>
            </TabsContent>
            <TabsContent value="proscons" className="mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <h4 className="font-heading font-bold text-emerald-400 mb-3 flex items-center gap-1.5"><Check className="h-4 w-4" /> {locale === 'hi' ? 'पक्ष' : 'Pros'}</h4>
                  <ul className="space-y-2 text-sm">
                    {pros.map((p, i) => <li key={i} className="flex gap-2"><span className="text-emerald-400 mt-0.5">+</span><span>{p}</span></li>)}
                    {!pros.length && <li className="text-muted-foreground">—</li>}
                  </ul>
                </div>
                <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                  <h4 className="font-heading font-bold text-rose-400 mb-3 flex items-center gap-1.5"><X className="h-4 w-4" /> {locale === 'hi' ? 'विपक्ष' : 'Cons'}</h4>
                  <ul className="space-y-2 text-sm">
                    {cons.map((p, i) => <li key={i} className="flex gap-2"><span className="text-rose-400 mt-0.5">−</span><span>{p}</span></li>)}
                    {!cons.length && <li className="text-muted-foreground">—</li>}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h3 className="font-heading font-bold text-2xl mb-6">{locale === 'hi' ? 'संबंधित' : 'Related'}</h3>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}

function FeatureChip({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-xl border border-border bg-card/50">
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
