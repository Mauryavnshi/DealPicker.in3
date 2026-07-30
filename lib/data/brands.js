// Featured brands. Keep as data-only — logos rendered as text badges to avoid third-party asset fetches.
export const BRANDS = [
  { slug: 'apple',    name: 'Apple' },
  { slug: 'samsung',  name: 'Samsung' },
  { slug: 'oneplus',  name: 'OnePlus' },
  { slug: 'nothing',  name: 'Nothing' },
  { slug: 'google',   name: 'Google' },
  { slug: 'hp',       name: 'HP' },
  { slug: 'dell',     name: 'Dell' },
  { slug: 'lenovo',   name: 'Lenovo' },
  { slug: 'asus',     name: 'ASUS' },
  { slug: 'canon',    name: 'Canon' },
  { slug: 'epson',    name: 'Epson' },
  { slug: 'sony',     name: 'Sony' },
  { slug: 'xiaomi',   name: 'Xiaomi' },
  { slug: 'realme',   name: 'realme' },
  { slug: 'boat',     name: 'boAt' },
];

export const getBrandBySlug = (slug) => BRANDS.find(b => b.slug === slug);
