// Product formatting utils.
export const inr = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');
export const pct = (mrp, price) => {
  const m = Number(mrp) || 0;
  const p = Number(price) || 0;
  if (m <= 0 || p <= 0 || m <= p) return 0;
  return Math.max(0, Math.round(((m - p) / m) * 100));
};

export const slugify = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
