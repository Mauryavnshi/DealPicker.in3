import { CATEGORIES } from '@/lib/data/categories';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dealpicker.in';

export default async function sitemap() {
  const now = new Date();
  const staticPaths = [
    '', 'about', 'contact', 'buying-guides', 'reviews', 'comparisons',
    'legal/affiliate-disclosure', 'legal/privacy', 'legal/terms', 'legal/disclaimer', 'legal/refund',
  ].map(p => ({ url: `${SITE_URL}/${p}`.replace(/\/$/, '') || SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 }));

  const catPaths = CATEGORIES.map(c => ({
    url: `${SITE_URL}/category/${c.slug}`, lastModified: now, changeFrequency: 'daily', priority: 0.8,
  }));

  return [...staticPaths, ...catPaths];
}
