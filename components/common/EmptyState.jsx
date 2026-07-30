'use client';

import { PackageSearch, Compass, Inbox } from 'lucide-react';
import Link from 'next/link';

/**
 * Beautiful empty state used by product grids, category pages, guides, reviews.
 */
export default function EmptyState({
  title = 'Nothing here yet',
  description,
  ctaLabel,
  ctaHref,
  icon = 'inbox',
  variant = 'default',
}) {
  const Icon = icon === 'search' ? PackageSearch : icon === 'compass' ? Compass : Inbox;

  if (variant === 'minimal') {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 py-14 px-6 text-center">
        <Icon className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">{title}</p>
        {ctaHref && ctaLabel && (
          <Link href={ctaHref} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            {ctaLabel} →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-dashed border-border bg-card/50 py-20 px-6 text-center">
      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-6 font-heading font-bold text-xl">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">{description}</p>}
      {ctaHref && ctaLabel && (
        <Link
          href={ctaHref}
          className="mt-6 inline-flex items-center gap-2 h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110 transition"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
