// Central catalog of categories used across nav, hamburger, footer, category pages.
// Keep icon names as strings — we resolve them to lucide-react components in components.
export const CATEGORIES = [
  { slug: 'mobiles',       name: { en: 'Mobiles',       hi: 'मोबाइल' },        icon: 'Smartphone',     description: { en: 'Latest smartphones from top brands', hi: 'शीर्ष ब्रांडों के नवीनतम स्मार्टफ़ोन' } },
  { slug: 'laptops',       name: { en: 'Laptops',       hi: 'लैपटॉप' },         icon: 'Laptop',         description: { en: 'Powerful laptops for work and play',    hi: 'काम और गेमिंग के लिए शक्तिशाली लैपटॉप' } },
  { slug: 'earbuds',       name: { en: 'Earbuds',       hi: 'ईयरबड्स' },        icon: 'Headphones',     description: { en: 'True wireless audio, curated',           hi: 'सच्चा वायरलेस ऑडियो, विशेष रूप से चुना गया' } },
  { slug: 'headphones',    name: { en: 'Headphones',    hi: 'हेडफ़ोन' },        icon: 'Headphones',     description: { en: 'Over-ear immersion & studio pairs',     hi: 'ओवर-ईयर विसर्जन और स्टूडियो जोड़े' } },
  { slug: 'smartwatches',  name: { en: 'Smartwatches',  hi: 'स्मार्टवॉच' },     icon: 'Watch',          description: { en: 'Fitness, focus and style on the wrist', hi: 'कलाई पर फिटनेस, फ़ोकस और स्टाइल' } },
  { slug: 'tv',            name: { en: 'TVs',           hi: 'टीवी' },           icon: 'Tv',             description: { en: '4K, OLED & QLED televisions',           hi: '4K, OLED और QLED टेलीविज़न' } },
  { slug: 'printers',      name: { en: 'Printers',      hi: 'प्रिंटर' },        icon: 'Printer',        description: { en: 'Home and office printers',              hi: 'घर और कार्यालय प्रिंटर' } },
  { slug: 'tablets',       name: { en: 'Tablets',       hi: 'टैबलेट' },         icon: 'Tablet',         description: { en: 'Tablets for creators and readers',      hi: 'रचनाकारों और पाठकों के लिए टैबलेट' } },
  { slug: 'accessories',   name: { en: 'Accessories',   hi: 'एक्सेसरीज़' },     icon: 'Cable',          description: { en: 'Cables, chargers, hubs and more',       hi: 'केबल, चार्जर, हब और बहुत कुछ' } },
  { slug: 'gaming',        name: { en: 'Gaming',        hi: 'गेमिंग' },         icon: 'Gamepad2',       description: { en: 'Consoles, controllers & gear',          hi: 'कंसोल, कंट्रोलर और गियर' } },
];

// Sub-nav that lives in the top bar (below main nav on desktop) and hamburger
export const TOP_NAV_CATEGORIES = ['mobiles', 'laptops', 'earbuds', 'headphones', 'smartwatches', 'tv', 'printers', 'tablets', 'accessories'];

export const NAV_LINKS = [
  { href: '/buying-guides', label: { en: 'Buying Guides', hi: 'खरीदी गाइड' } },
  { href: '/reviews',       label: { en: 'Reviews',       hi: 'समीक्षा' } },
  { href: '/comparisons',   label: { en: 'Comparisons',   hi: 'तुलना' } },
];

export const getCategoryBySlug = (slug) => CATEGORIES.find(c => c.slug === slug);
