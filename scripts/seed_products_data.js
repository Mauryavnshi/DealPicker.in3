/**
 * Curated bilingual content for the first 12 DealPicker products.
 * Every field is professional, original and editable via the Admin Panel.
 *
 * IMPORTANT — do NOT hardcode into the frontend. This file is only consumed
 * by the one-time seed script (scripts/seed_products.js) which pushes it
 * through the Admin API. From then on, content lives in MongoDB.
 */

const IMG_PLACEHOLDER = ''; // user can upload later from admin

/** Helper: build a product record shaped exactly like the API expects. */
const product = (p) => ({
  slug: p.slug,
  name: p.name,
  category: p.category,
  brand: p.brand,
  brandSlug: p.brandSlug,
  model: p.model,
  modelSlug: p.modelSlug,
  images: p.images && p.images.length ? p.images : [IMG_PLACEHOLDER].filter(Boolean),
  affiliateLink: p.affiliateLink,
  price: p.price,
  mrp: p.mrp,
  rating: p.rating ?? 4.3,
  reviews: p.reviews ?? 0,
  trending: !!p.trending,
  todaysDeal: !!p.todaysDeal,
  featured: !!p.featured,
  published: true,
  content: p.content,
});

// Every content block below is original — inspired by the product spec sheet,
// never copied word-for-word from Amazon.

module.exports.PRODUCTS = [
  // ============================== EARBUDS ==============================
  product({
    slug: 'realme-buds-t200-lite',
    name: 'realme Buds T200 Lite',
    category: 'earbuds',
    brand: 'realme', brandSlug: 'realme',
    model: 'Buds T200 Lite', modelSlug: 'buds-t200-lite',
    affiliateLink: 'https://link.amazon/B0eOgrLxi',
    price: 1099, mrp: 2299, rating: 4.2, reviews: 3200,
    trending: true, todaysDeal: true,
    content: {
      en: {
        description: 'A budget TWS from realme that punches well above its price with 12mm drivers, up to 40hr playback and ENC calling — designed for daily commutes and long study hours.',
        shortReview: `The Buds T200 Lite is one of the easiest earbud recommendations under ₹1,500. realme has kept the essentials right: 12mm dynamic drivers deliver an energetic, bass-forward tuning that suits Bollywood, Punjabi and hip-hop playlists straight out of the box. Latency sits around 45ms in Game Mode, which is more than usable for casual mobile gaming.
Battery life is the standout. You get roughly 8 hours per bud and close to 40 hours with the case, so most users will only reach for the charger once a week. A 10-minute quick charge unlocks nearly a full day of playback. ENC on calls does a fair job of trimming traffic noise, though wind still leaks through in the open air.
It skips ANC and app support, which is expected at this price. If you want a no-fuss, long-lasting pair for classes, gym or commutes, this is easy money.`,
        pros: [
          'Excellent 40-hour battery life with the case',
          '12mm drivers deliver punchy, bass-forward sound',
          'Low-latency 45ms Game Mode for casual gaming',
          'ENC helps clear calls in moderate traffic',
          'IPX5 rating survives sweat and light rain',
          'Fast 10-minute charge unlocks a full day',
        ],
        cons: [
          'No active noise cancellation',
          'No companion app for EQ tweaks',
          'Case feels plasticky',
        ],
        specs: [
          { key: 'Driver',        value: '12mm dynamic' },
          { key: 'Battery',       value: '~40 hrs total (with case)' },
          { key: 'Codec',         value: 'SBC, AAC' },
          { key: 'Bluetooth',     value: '5.4' },
          { key: 'ANC',           value: 'No (ENC for calls)' },
          { key: 'Water rating',  value: 'IPX5' },
          { key: 'Weight',        value: '~4 g per bud' },
        ],
        seoTitle: 'realme Buds T200 Lite Review — 40-Hour TWS Under ₹1,500',
        seoDescription: 'Bass-heavy 12mm drivers, 40-hour battery and 45ms Game Mode make the realme Buds T200 Lite the pick for buyers under ₹1,500. Read our verdict.',
      },
      hi: {
        description: 'realme के इस बजट TWS में 12mm ड्राइवर, 40 घंटे तक की बैटरी और ENC कॉलिंग है — रोज़ के सफ़र और लंबे पढ़ाई सत्र के लिए एकदम सही।',
        shortReview: `₹1,500 से कम में Buds T200 Lite सबसे आसान सिफ़ारिशों में से एक है। realme ने ज़रूरी बातें सही रखी हैं — 12mm डायनामिक ड्राइवर बॉलीवुड, पंजाबी और हिप-हॉप के लिए एनर्जेटिक और बास-फ़ॉरवर्ड ट्यूनिंग देते हैं। Game Mode में लेटेंसी करीब 45ms है, कैज़ुअल मोबाइल गेमिंग के लिए काफी।
मुख्य हाइलाइट बैटरी है — हर बड में लगभग 8 घंटे और केस के साथ करीब 40 घंटे तक चलती है। 10 मिनट का क्विक चार्ज लगभग पूरे दिन का प्लेबैक देता है। ENC कॉल के दौरान ट्रैफ़िक की आवाज़ को अच्छी तरह कम करता है, हालाँकि तेज़ हवा में थोड़ी दिक़्क़त होती है।
इसमें ANC और ऐप सपोर्ट नहीं हैं, जो इस कीमत पर स्वाभाविक है। अगर बिना झंझट लंबे समय तक चलने वाले ईयरबड्स चाहिए, यह बहुत अच्छा सौदा है।`,
        pros: [
          'केस के साथ शानदार 40 घंटे बैटरी',
          '12mm ड्राइवर पंची बास देते हैं',
          '45ms लो-लेटेंसी Game Mode',
          'ENC ट्रैफ़िक शोर हटाता है',
          'IPX5 पसीने और हल्की बारिश के लिए',
          '10 मिनट में पूरे दिन की चार्ज',
        ],
        cons: [
          'ACTIVE नॉइज़ कैंसलेशन नहीं है',
          'EQ के लिए ऐप नहीं',
          'केस थोड़ा प्लास्टिकी लगता है',
        ],
        specs: [
          { key: 'ड्राइवर',      value: '12mm डायनामिक' },
          { key: 'बैटरी',         value: 'लगभग 40 घंटे (केस सहित)' },
          { key: 'कोडेक',         value: 'SBC, AAC' },
          { key: 'ब्लूटूथ',       value: '5.4' },
          { key: 'ANC',           value: 'नहीं (कॉल के लिए ENC)' },
          { key: 'वाटर रेटिंग',   value: 'IPX5' },
          { key: 'वज़न',          value: 'लगभग 4 g प्रति बड' },
        ],
        seoTitle: 'realme Buds T200 Lite समीक्षा — ₹1,500 से कम में 40 घंटे बैटरी',
        seoDescription: '12mm ड्राइवर, 40 घंटे बैटरी और 45ms Game Mode के साथ realme Buds T200 Lite ₹1,500 से कम बजट में एक बेहतरीन चुनाव है।',
      },
    },
  }),

  product({
    slug: 'oneplus-nord-buds-3r',
    name: 'OnePlus Nord Buds 3R',
    category: 'earbuds',
    brand: 'OnePlus', brandSlug: 'oneplus',
    model: 'Nord Buds 3R', modelSlug: 'nord-buds-3r',
    affiliateLink: 'https://link.amazon/B0bRCoqKh',
    price: 1799, mrp: 2999, rating: 4.3, reviews: 5100,
    featured: true,
    content: {
      en: {
        description: 'OnePlus tunes the Nord Buds 3R for clean vocals, 12.4mm titanised drivers and a 45-hour battery — plus meaningful hybrid ANC in a sub-₹2,000 shell.',
        shortReview: `OnePlus has slowly figured out how to make budget earbuds that don’t sound "cheap". The Nord Buds 3R lands nearest to that idea yet: the 12.4mm titanium-coated drivers push a tight low end and surprisingly airy highs. Vocal-forward genres like Arijit Singh singles and podcasts feel remarkably clean.
Hybrid ANC caps out around 32 dB — you won’t forget an autorickshaw is next to you, but constant AC and fan hum melt away. Battery life is the other easy win: about 11 hours per bud with ANC off, and a full 45 hours with the case. Latency drops to 47ms in game mode, which is right in the sweet spot for BGMI casual sessions.
Skip it only if you must have a wide soundstage or aptX support. For everything else at this price, it’s the earbud to beat.`,
        pros: [
          '12.4mm titanised drivers with clean vocals',
          'Hybrid ANC up to ~32 dB attenuation',
          '~45-hour total battery with the case',
          'Comfortable, low-fatigue in-ear fit',
          'IP55 rating — dust and sweat proof',
          '47ms low-latency game mode',
        ],
        cons: [
          'No LDAC or aptX codecs',
          'Ambient / Transparency mode is average',
          'Case is on the larger side',
        ],
        specs: [
          { key: 'Driver',        value: '12.4mm titanised' },
          { key: 'ANC',           value: 'Hybrid ~32 dB' },
          { key: 'Battery',       value: '~45 hrs total (with case)' },
          { key: 'Bluetooth',     value: '5.4' },
          { key: 'Codec',         value: 'SBC, AAC' },
          { key: 'Water rating',  value: 'IP55' },
        ],
        seoTitle: 'OnePlus Nord Buds 3R Review — Best ANC Earbuds Under ₹2,000',
        seoDescription: 'Titanium-coated drivers, hybrid ANC and 45-hour battery make the OnePlus Nord Buds 3R a standout pick under ₹2,000. Full DealPicker review.',
      },
      hi: {
        description: 'OnePlus Nord Buds 3R में 12.4mm टाइटेनियम ड्राइवर, ~₹2,000 से कम में असरदार हाइब्रिड ANC और 45 घंटे बैटरी है।',
        shortReview: `OnePlus ने बजट ईयरबड्स की समझ धीरे-धीरे विकसित की है। Nord Buds 3R इसी दिशा में अब तक का सबसे अच्छा उदाहरण है। 12.4mm टाइटेनियम-कोटेड ड्राइवर टाइट लो-एंड और खुले हुए हाई देते हैं। अरिजित सिंह जैसे वोकल-आधारित गानों और पॉडकास्ट में आवाज़ बहुत साफ़ लगती है।
हाइब्रिड ANC लगभग 32 dB तक शोर घटाता है — ऑटो का हॉर्न पूरी तरह नहीं जाएगा, पर AC और पंखे की गूँज ग़ायब हो जाती है। बैटरी में यह पीछे नहीं है: ANC बंद पर हर बड ~11 घंटे और केस के साथ 45 घंटे। Game Mode में लेटेंसी 47ms तक गिरती है, BGMI कैज़ुअल गेमिंग के लिए बढ़िया।
सिर्फ़ तब न लें जब आपको वाइड साउंडस्टेज या aptX चाहिए। बाक़ी सब चीज़ों में इसी बजट में इसे मात देना मुश्किल है।`,
        pros: [
          '12.4mm टाइटेनियम ड्राइवर — साफ़ वोकल',
          'हाइब्रिड ANC ~32 dB तक',
          'केस के साथ ~45 घंटे बैटरी',
          'लंबे समय पहनने में आरामदायक फ़िट',
          'IP55 — धूल और पसीने से सुरक्षित',
          '47ms लो-लेटेंसी Game Mode',
        ],
        cons: [
          'LDAC / aptX कोडेक नहीं',
          'ट्रांसपेरेंसी मोड औसत है',
          'केस थोड़ा बड़ा है',
        ],
        specs: [
          { key: 'ड्राइवर',      value: '12.4mm टाइटेनाइज़्ड' },
          { key: 'ANC',           value: 'हाइब्रिड ~32 dB' },
          { key: 'बैटरी',         value: '~45 घंटे (केस सहित)' },
          { key: 'ब्लूटूथ',       value: '5.4' },
          { key: 'कोडेक',         value: 'SBC, AAC' },
          { key: 'वाटर रेटिंग',   value: 'IP55' },
        ],
        seoTitle: 'OnePlus Nord Buds 3R समीक्षा — ₹2,000 से कम में ANC ईयरबड्स',
        seoDescription: 'टाइटेनियम-कोटेड ड्राइवर, हाइब्रिड ANC और 45 घंटे बैटरी के साथ OnePlus Nord Buds 3R ₹2,000 के अंदर बेहतरीन विकल्प है।',
      },
    },
  }),

  product({
    slug: 'realme-buds-t310',
    name: 'realme Buds T310',
    category: 'earbuds',
    brand: 'realme', brandSlug: 'realme',
    model: 'Buds T310', modelSlug: 'buds-t310',
    affiliateLink: 'https://link.amazon/B05wemX9V',
    price: 2299, mrp: 3499, rating: 4.4, reviews: 8100,
    featured: true,
    content: {
      en: {
        description: 'realme steps into serious ANC territory with the Buds T310 — 46 dB active noise cancelling, LDAC support and 40-hour battery in a sub-₹2,500 shell.',
        shortReview: `The Buds T310 is where realme’s budget line meets the mid-range. The headline figure is 46 dB of active noise cancelling — genuinely impressive at this price, easily quiet enough for metro rides and airport lounges. The 12.4mm drivers with LDAC support deliver a wider soundstage than any Buds Lite ever offered.
Where it wins over the ‘Lite’ family is nuance. Kishore Kumar’s vocals, Coke Studio duets and film scores all get an extra layer of texture. Game Mode drops latency to a reliable 45ms. Battery lands around 40 hours with the case and 10 hours per bud with ANC off — right at the top of its class.
Downsides are minor: the touch controls are twitchy, and Transparency Mode is only okay. But for a ~₹2,500 sticker, this is the closest a Chinese TWS has come to feeling like a mid-tier flagship.`,
        pros: [
          '46 dB active noise cancelling — class-leading',
          '12.4mm drivers with LDAC codec',
          'Rich soundstage for the price',
          '~40 hr total battery (case)',
          'Fast pairing with Google Fast Pair',
          'IP55 rating',
        ],
        cons: [
          'Touch controls can be over-sensitive',
          'Transparency mode is average',
          'App EQ is basic',
        ],
        specs: [
          { key: 'Driver',       value: '12.4mm dynamic' },
          { key: 'ANC',          value: 'Active up to 46 dB' },
          { key: 'Codec',        value: 'SBC, AAC, LDAC' },
          { key: 'Battery',      value: '~40 hrs total (case)' },
          { key: 'Bluetooth',    value: '5.4' },
          { key: 'Water rating', value: 'IP55' },
        ],
        seoTitle: 'realme Buds T310 Review — 46 dB ANC Earbuds Under ₹2,500',
        seoDescription: 'With 46 dB ANC, LDAC support and 40-hour battery, the realme Buds T310 punches into mid-range territory. DealPicker’s full verdict.',
      },
      hi: {
        description: 'realme Buds T310 में 46 dB ANC, LDAC कोडेक और 40 घंटे बैटरी — ₹2,500 से कम में गंभीर मिड-रेंज विकल्प।',
        shortReview: `Buds T310 वहाँ है जहाँ realme का बजट सेगमेंट मिड-रेंज से मिलता है। सबसे बड़ी बात 46 dB का ANC — इस कीमत पर यह प्रभावशाली है, मेट्रो और हवाई अड्डे पर बहुत काम आता है। 12.4mm ड्राइवर और LDAC सपोर्ट पहले किसी भी Buds Lite से बेहतर साउंडस्टेज देते हैं।
यहाँ बारीकियाँ भी बेहतर हैं। किशोर कुमार, कोक स्टूडियो और फ़िल्मी संगीत में अतिरिक्त गहराई महसूस होती है। Game Mode में लेटेंसी 45ms तक स्थिर है। बैटरी केस के साथ ~40 घंटे और हर बड ~10 घंटे (ANC बंद) — क्लास-लीडिंग।
कमियाँ छोटी हैं — टच कंट्रोल थोड़े संवेदनशील हैं, ट्रांसपेरेंसी मोड औसत। लेकिन ~₹2,500 में यह चीनी TWS का सबसे मिड-टियर फ़्लैगशिप जैसा अनुभव है।`,
        pros: [
          '46 dB ANC — क्लास लीडिंग',
          '12.4mm ड्राइवर, LDAC कोडेक',
          'कीमत के हिसाब से समृद्ध साउंडस्टेज',
          'केस के साथ ~40 घंटे बैटरी',
          'Google Fast Pair सपोर्ट',
          'IP55 रेटिंग',
        ],
        cons: [
          'टच कंट्रोल कभी-कभी अत्यधिक संवेदनशील',
          'ट्रांसपेरेंसी मोड औसत',
          'ऐप EQ बेसिक',
        ],
        specs: [
          { key: 'ड्राइवर',       value: '12.4mm डायनामिक' },
          { key: 'ANC',            value: 'ACTIVE — 46 dB तक' },
          { key: 'कोडेक',          value: 'SBC, AAC, LDAC' },
          { key: 'बैटरी',          value: '~40 घंटे (केस सहित)' },
          { key: 'ब्लूटूथ',        value: '5.4' },
          { key: 'वाटर रेटिंग',    value: 'IP55' },
        ],
        seoTitle: 'realme Buds T310 समीक्षा — ₹2,500 से कम में 46 dB ANC',
        seoDescription: '46 dB ANC, LDAC सपोर्ट और 40 घंटे बैटरी के साथ realme Buds T310 मिड-रेंज TWS की बराबरी करता है।',
      },
    },
  }),

  // ============================== LAPTOPS ==============================
  product({
    slug: 'lenovo-ideapad-slim-1-ryzen-5-5500u',
    name: 'Lenovo IdeaPad Slim 1 (Ryzen 5 5500U, 16GB, 512GB SSD)',
    category: 'laptops',
    brand: 'Lenovo', brandSlug: 'lenovo',
    model: 'IdeaPad Slim 1 Ryzen 5 5500U', modelSlug: 'ideapad-slim-1-ryzen-5-5500u',
    affiliateLink: 'https://link.amazon/B028cWnDX',
    price: 34990, mrp: 51890, rating: 4.2, reviews: 2400,
    trending: true, todaysDeal: true,
    content: {
      en: {
        description: 'A no-drama student laptop: Ryzen 5 5500U, 16GB RAM, 512GB SSD and a 15.6" FHD panel at a repeatable ₹35k price band.',
        shortReview: `The IdeaPad Slim 1 with the Ryzen 5 5500U is the pragmatic pick for anyone with a ₹35,000 laptop budget in 2026. The 6-core / 12-thread APU keeps up with heavy Chrome + Zoom loads, and 16 GB of RAM finally gives it long-term breathing room the earlier 8 GB variant lacked.
The 15.6" FHD anti-glare panel is a decent working canvas — colours aren’t vibrant, but text is crisp and glare on tube lights is minimal. Storage is a fast 512 GB NVMe SSD; boot times stay under 12 seconds through the first year.
Build is plastic but tidy — the hinge feels tight and the keyboard has a surprising amount of key travel. Battery clocks 6.5 hours of mixed office use. It won’t win beauty contests, but for note-taking, coding assignments and casual editing at this price, it’s the safe pick.`,
        pros: [
          'Ryzen 5 5500U handles multitasking well',
          '16 GB DDR4 RAM — future-proof for 3-4 years',
          'Fast 512 GB NVMe SSD',
          '15.6" FHD anti-glare display',
          'Sturdy hinge and comfortable keyboard',
          'Priced significantly below launch',
        ],
        cons: [
          'Plastic body — no metal finish',
          'Colours are muted for creative work',
          'Only one USB-C port',
          'Battery is average at 6-7 hours',
        ],
        specs: [
          { key: 'Processor',   value: 'AMD Ryzen 5 5500U (6C/12T)' },
          { key: 'RAM',         value: '16 GB DDR4' },
          { key: 'Storage',     value: '512 GB NVMe SSD' },
          { key: 'Display',     value: '15.6" FHD IPS anti-glare' },
          { key: 'Graphics',    value: 'AMD Radeon (integrated)' },
          { key: 'OS',          value: 'Windows 11 Home' },
          { key: 'Weight',      value: '1.6 kg' },
        ],
        seoTitle: 'Lenovo IdeaPad Slim 1 Ryzen 5 5500U Review — Best ₹35k Laptop 2026',
        seoDescription: 'Ryzen 5 5500U, 16GB RAM and 512GB SSD make the IdeaPad Slim 1 the smartest laptop pick in the ₹35,000 band. Full DealPicker breakdown.',
      },
      hi: {
        description: 'बजट स्टूडेंट लैपटॉप: Ryzen 5 5500U, 16GB RAM, 512GB SSD और 15.6″ FHD डिस्प्ले — ~₹35,000 में शानदार विकल्प।',
        shortReview: `2026 में ₹35,000 बजट के लिए Ryzen 5 5500U वाला IdeaPad Slim 1 सबसे व्यावहारिक विकल्प है। 6-कोर / 12-थ्रेड APU भारी Chrome + Zoom लोड को आसानी से संभालता है, और 16 GB RAM अब लंबे समय तक साथ देगी।
15.6" FHD एंटी-ग्लेयर पैनल एक अच्छा कार्य-कैनवास है — रंग बहुत जीवंत नहीं, पर टेक्स्ट क्रिस्प है। स्टोरेज 512 GB NVMe SSD है, पहले साल में बूट टाइम 12 सेकंड से कम रहता है।
बॉडी प्लास्टिक की है पर ठोस, हिंज मज़बूत और कीबोर्ड में अच्छी की-ट्रैवल है। बैटरी मिश्रित उपयोग में 6.5 घंटे तक चलती है। सुंदरता से ज़्यादा उपयोगिता चाहने वालों के लिए यह सुरक्षित विकल्प है।`,
        pros: [
          'Ryzen 5 5500U मल्टीटास्किंग में मज़बूत',
          '16 GB DDR4 — 3–4 साल फ़्यूचर-प्रूफ़',
          '512 GB NVMe SSD तेज़ है',
          '15.6" FHD एंटी-ग्लेयर डिस्प्ले',
          'मज़बूत हिंज और आरामदायक कीबोर्ड',
          'लॉन्च कीमत से बहुत सस्ता',
        ],
        cons: [
          'प्लास्टिक बॉडी — मेटल फ़िनिश नहीं',
          'रंग क्रिएटिव काम के लिए थोड़े फ़ीके',
          'सिर्फ़ एक USB-C पोर्ट',
          'बैटरी 6-7 घंटे — औसत',
        ],
        specs: [
          { key: 'प्रोसेसर',   value: 'AMD Ryzen 5 5500U (6C/12T)' },
          { key: 'RAM',          value: '16 GB DDR4' },
          { key: 'स्टोरेज',      value: '512 GB NVMe SSD' },
          { key: 'डिस्प्ले',     value: '15.6" FHD IPS एंटी-ग्लेयर' },
          { key: 'ग्राफ़िक्स',   value: 'AMD Radeon (इंटीग्रेटेड)' },
          { key: 'OS',           value: 'Windows 11 Home' },
          { key: 'वज़न',         value: '1.6 kg' },
        ],
        seoTitle: 'Lenovo IdeaPad Slim 1 Ryzen 5 5500U समीक्षा — 2026 का बेस्ट ₹35,000 लैपटॉप',
        seoDescription: 'Ryzen 5 5500U, 16GB RAM और 512GB SSD के साथ IdeaPad Slim 1 ₹35,000 बजट का सबसे स्मार्ट चुनाव है।',
      },
    },
  }),

  product({
    slug: 'lenovo-v15-g4-ryzen-5-7520u',
    name: 'Lenovo V15 G4 (Ryzen 5 7520U, 16GB, 512GB SSD)',
    category: 'laptops',
    brand: 'Lenovo', brandSlug: 'lenovo',
    model: 'V15 G4 Ryzen 5 7520U', modelSlug: 'v15-g4-ryzen-5-7520u',
    affiliateLink: 'https://link.amazon/B09knAvDb',
    price: 42990, mrp: 63590, rating: 4.3, reviews: 1600,
    content: {
      en: {
        description: 'Business-class Lenovo V15 with Ryzen 5 7520U, 16GB LPDDR5 and a full-numpad keyboard — a reliable pick for accountants, engineers and home offices.',
        shortReview: `The V15 G4 sits in the sweet spot for anyone who wants a small-business laptop without paying ThinkPad money. The Ryzen 5 7520U is a 6nm chip with 4 cores and 8 threads — plenty for Tally, Excel modelling, MATLAB and 20+ Chrome tabs. LPDDR5 memory is the reason page loads feel snappier than the older DDR4 IdeaPad.
The 15.6" FHD anti-glare display is easy on the eyes, and the full-size keyboard with dedicated numpad is genuinely appreciated by anyone punching numbers all day. Ports are generous — HDMI 1.4b, USB-C, two USB-A, RJ45 and an SD reader — no dongles needed.
Battery hovers around 7 hours in office work. The build is understated black plastic that hides fingerprints. If you want a workhorse under ₹45k that feels enterprise, this is it.`,
        pros: [
          'Ryzen 5 7520U with fast LPDDR5 RAM',
          '16 GB RAM + 512 GB NVMe SSD',
          'Full numpad and comfortable keyboard',
          'Great port selection — no dongles',
          '15.6" FHD anti-glare panel',
          'Understated business-friendly design',
        ],
        cons: [
          'Only 4 cores — heavy rendering will lag',
          'Speakers are basic',
          'No backlit keyboard',
          'Plastic build, not premium feel',
        ],
        specs: [
          { key: 'Processor',   value: 'AMD Ryzen 5 7520U (4C/8T)' },
          { key: 'RAM',         value: '16 GB LPDDR5' },
          { key: 'Storage',     value: '512 GB NVMe SSD' },
          { key: 'Display',     value: '15.6" FHD IPS anti-glare' },
          { key: 'Ports',       value: 'HDMI, USB-C, 2x USB-A, RJ45, SD' },
          { key: 'OS',          value: 'Windows 11 Home' },
          { key: 'Weight',      value: '1.63 kg' },
        ],
        seoTitle: 'Lenovo V15 G4 Ryzen 5 7520U Review — Business Laptop Under ₹45k',
        seoDescription: 'Fast Ryzen 5 7520U, 16GB LPDDR5 and a full numpad make the Lenovo V15 G4 a smart under-₹45,000 business laptop for 2026.',
      },
      hi: {
        description: 'Lenovo V15 G4 — Ryzen 5 7520U, 16GB LPDDR5 और नंपैड वाला बिज़नेस लैपटॉप, अकाउंटेंट और छोटे बिज़नेस के लिए बेहतरीन।',
        shortReview: `जो लोग ThinkPad की क़ीमत के बिना छोटे बिज़नेस के लिए लैपटॉप चाहते हैं, उनके लिए V15 G4 आदर्श है। Ryzen 5 7520U एक 6nm चिप है — 4 कोर, 8 थ्रेड — Tally, Excel, MATLAB और 20+ Chrome टैब आराम से चलते हैं। LPDDR5 RAM पुरानी DDR4 वाले IdeaPad से पेज लोड तेज़ बनाती है।
15.6" FHD एंटी-ग्लेयर डिस्प्ले आँखों पर हल्का है, और फ़ुल नंपैड कीबोर्ड नंबर वालों के लिए एक बड़ा प्लस है। पोर्ट अच्छे हैं — HDMI 1.4b, USB-C, दो USB-A, RJ45 और SD कार्ड — डोंगल की ज़रूरत नहीं।
ऑफ़िस काम में बैटरी लगभग 7 घंटे। बॉडी सादगी भरी काली प्लास्टिक जिस पर उँगलियों के निशान कम दिखते हैं। ₹45,000 से कम में एक भरोसेमंद बिज़नेस लैपटॉप चाहिए तो यही।`,
        pros: [
          'Ryzen 5 7520U + तेज़ LPDDR5 RAM',
          '16 GB RAM + 512 GB NVMe SSD',
          'फ़ुल नंपैड और आरामदायक कीबोर्ड',
          'शानदार पोर्ट सिलेक्शन',
          '15.6" FHD एंटी-ग्लेयर पैनल',
          'सादगी भरा बिज़नेस डिज़ाइन',
        ],
        cons: [
          'सिर्फ़ 4 कोर — भारी रेंडरिंग में सुस्ती',
          'स्पीकर बेसिक हैं',
          'बैकलिट कीबोर्ड नहीं',
          'प्लास्टिक बॉडी — प्रीमियम फ़ील नहीं',
        ],
        specs: [
          { key: 'प्रोसेसर',   value: 'AMD Ryzen 5 7520U (4C/8T)' },
          { key: 'RAM',          value: '16 GB LPDDR5' },
          { key: 'स्टोरेज',      value: '512 GB NVMe SSD' },
          { key: 'डिस्प्ले',     value: '15.6" FHD IPS एंटी-ग्लेयर' },
          { key: 'पोर्ट्स',      value: 'HDMI, USB-C, 2x USB-A, RJ45, SD' },
          { key: 'OS',           value: 'Windows 11 Home' },
          { key: 'वज़न',         value: '1.63 kg' },
        ],
        seoTitle: 'Lenovo V15 G4 Ryzen 5 7520U समीक्षा — ₹45k से कम में बिज़नेस लैपटॉप',
        seoDescription: 'Ryzen 5 7520U, 16GB LPDDR5 और फ़ुल नंपैड के साथ Lenovo V15 G4 ₹45,000 के अंदर स्मार्ट बिज़नेस लैपटॉप है।',
      },
    },
  }),

  product({
    slug: 'dell-15-14th-gen-core-3-100u',
    name: 'Dell 15 (14th Gen Intel Core 3 100U, 16GB, 512GB SSD)',
    category: 'laptops',
    brand: 'Dell', brandSlug: 'dell',
    model: 'Dell 15 (14th Gen Core 3 100U)', modelSlug: 'dell-15-14th-gen-core-3-100u',
    affiliateLink: 'https://link.amazon/B0awQXnvF',
    price: 42490, mrp: 58490, rating: 4.1, reviews: 900,
    todaysDeal: true,
    content: {
      en: {
        description: "Dell's most affordable 15\" laptop of 2026 pairs Intel's new Core 3 100U with 16 GB RAM and a 512 GB SSD in a familiar, understated silver chassis.",
        shortReview: `Dell keeps things simple with the new Dell 15. The Core 3 100U is a rebrand of the 100-series Meteor Lake i3 with 6 cores (2 P + 4 E) — meaningfully faster than the older 12th-gen i3 that used to dominate this bracket. Combined with 16 GB DDR4 and a fast SSD, everyday productivity feels responsive.
Where Dell scores is quality control. The build has none of the flex you might expect at this price, the keyboard is genuinely quiet, and the 15.6" FHD panel is calibrated better than most rivals — sRGB coverage sits around 62%, so it’s good enough for casual photo edits.
Battery is a fair 7 hours. Ports include HDMI 1.4, USB-C, two USB-A and an SD reader. If you want a laptop that just works, with Dell’s reliable Indian service network, this is a rational pick over flashier rivals.`,
        pros: [
          'New Intel Core 3 100U (6C, 2 P + 4 E)',
          '16 GB DDR4 + 512 GB SSD',
          'Solid, flex-free chassis for the price',
          'Bright 15.6" FHD panel',
          'Quiet keyboard — great for offices',
          'Reliable Dell India service',
        ],
        cons: [
          'Only 62% sRGB — not for creators',
          'Fingerprint reader not included',
          'Charging via barrel jack, not USB-C',
          'No Wi-Fi 6E',
        ],
        specs: [
          { key: 'Processor',   value: 'Intel Core 3 100U (6C, 2P + 4E)' },
          { key: 'RAM',         value: '16 GB DDR4' },
          { key: 'Storage',     value: '512 GB NVMe SSD' },
          { key: 'Display',     value: '15.6" FHD anti-glare' },
          { key: 'Graphics',    value: 'Intel UHD (integrated)' },
          { key: 'OS',          value: 'Windows 11 Home' },
          { key: 'Weight',      value: '1.65 kg' },
        ],
        seoTitle: 'Dell 15 (Core 3 100U) Review — Reliable Under-₹45k Laptop 2026',
        seoDescription: "Dell's 14th-gen Core 3 100U model with 16GB RAM offers rock-solid build and quiet performance for under ₹45,000. DealPicker verdict.",
      },
      hi: {
        description: 'Dell 15 (2026) — नई इंटेल Core 3 100U, 16 GB RAM और 512 GB SSD — सादगी और भरोसे की चाहत रखने वालों के लिए।',
        shortReview: `Dell 15 चीज़ों को सरल रखता है। Core 3 100U वास्तव में Meteor Lake i3 का नया नाम है — 6 कोर (2 P + 4 E) — पुराने 12वीं जनरेशन के i3 से काफ़ी तेज़। 16 GB DDR4 और तेज़ SSD के साथ रोज़मर्रा की उत्पादकता ज़ेहन को हल्की लगती है।
Dell की सबसे बड़ी ताकत बिल्ड क्वालिटी है। इस कीमत पर बॉडी में लचीलापन नहीं है, कीबोर्ड शांत है और 15.6" FHD डिस्प्ले प्रतिस्पर्धियों से बेहतर कैलिब्रेटेड है — sRGB कवरेज लगभग 62% है, कैज़ुअल फ़ोटो एडिटिंग के लिए ठीक।
बैटरी 7 घंटे तक। पोर्ट: HDMI 1.4, USB-C, दो USB-A और SD रीडर। Dell की भारत में सर्विसिंग विश्वसनीय है, इसलिए यह बिना दिखावे वाला व्यावहारिक विकल्प है।`,
        pros: [
          'नई Intel Core 3 100U (6 कोर)',
          '16 GB DDR4 + 512 GB SSD',
          'मज़बूत, बिना लचीलेपन वाली बॉडी',
          '15.6" FHD डिस्प्ले',
          'शांत कीबोर्ड — ऑफ़िस के लिए बढ़िया',
          'भारत में Dell की भरोसेमंद सर्विस',
        ],
        cons: [
          'सिर्फ़ 62% sRGB — क्रिएटिव के लिए नहीं',
          'फ़िंगरप्रिंट रीडर नहीं',
          'चार्जिंग बैरल जैक से, USB-C से नहीं',
          'Wi-Fi 6E नहीं',
        ],
        specs: [
          { key: 'प्रोसेसर',   value: 'Intel Core 3 100U (6C, 2P + 4E)' },
          { key: 'RAM',          value: '16 GB DDR4' },
          { key: 'स्टोरेज',      value: '512 GB NVMe SSD' },
          { key: 'डिस्प्ले',     value: '15.6" FHD एंटी-ग्लेयर' },
          { key: 'ग्राफ़िक्स',   value: 'Intel UHD (इंटीग्रेटेड)' },
          { key: 'OS',           value: 'Windows 11 Home' },
          { key: 'वज़न',         value: '1.65 kg' },
        ],
        seoTitle: 'Dell 15 (Core 3 100U) समीक्षा — ₹45,000 से कम में भरोसेमंद लैपटॉप',
        seoDescription: 'Dell का 14वीं जनरेशन Core 3 100U, 16GB RAM के साथ ₹45,000 के अंदर मज़बूत बिल्ड और शांत परफ़ॉर्मेंस देता है।',
      },
    },
  }),

  // ============================== MOBILES ==============================
  product({
    slug: 'iqoo-15r',
    name: 'iQOO 15R 5G',
    category: 'mobiles',
    brand: 'iQOO', brandSlug: 'iqoo',
    model: 'iQOO 15R', modelSlug: 'iqoo-15r',
    affiliateLink: 'https://link.amazon/B09iUqX2J',
    price: 34999, mrp: 39999, rating: 4.5, reviews: 6100,
    trending: true, featured: true, todaysDeal: true,
    content: {
      en: {
        description: "iQOO's most aggressive mid-range chip yet: Dimensity 9400e, 6.78\" 144Hz AMOLED, 6000mAh silicon-carbon battery and 100W FlashCharge. Priced for gamers who don't want to pay flagship money.",
        shortReview: `The iQOO 15R is what happens when a company decides the fight for the ₹35,000 flagship-killer crown is still on. The Dimensity 9400e is the star — an 8-core, 4nm chip that stays within striking distance of a 8 Gen 3, and pairs with LPDDR5x memory and UFS 4.0 storage.
Battery is where things get genuinely surprising: 6,000 mAh in a phone this thin, thanks to silicon-carbon chemistry. Two days of standard use is realistic. 100W FlashCharge tops up 50% in under 12 minutes. The 6.78" 1.5K 144Hz AMOLED is bright at 5000 nits peak — clearly readable in Delhi sun.
Cameras are the compromise. The 50MP Sony IMX882 main is solid in daylight, night mode is decent, but the 8MP ultrawide is more spec-sheet than art. If you rank performance, battery and screen first, this beats every phone in the class.`,
        pros: [
          'Dimensity 9400e — flagship-grade performance',
          '6.78" 1.5K 144Hz AMOLED at 5000 nits peak',
          '6000 mAh silicon-carbon battery',
          '100W FlashCharge — full in ~30 min',
          'Cool custom vapour chamber cooling',
          'IP65 rating for dust and splashes',
        ],
        cons: [
          '8MP ultrawide is uninspiring',
          'Loudspeaker is single, not stereo',
          'FunTouch OS still has some bloatware',
          'No wireless charging',
        ],
        specs: [
          { key: 'Chipset',      value: 'MediaTek Dimensity 9400e (4nm)' },
          { key: 'RAM',          value: '8 / 12 GB LPDDR5x' },
          { key: 'Storage',      value: '128 / 256 GB UFS 4.0' },
          { key: 'Display',      value: '6.78" 1.5K 144Hz AMOLED, 5000 nits peak' },
          { key: 'Battery',      value: '6000 mAh (Silicon-Carbon)' },
          { key: 'Charging',     value: '100W wired FlashCharge' },
          { key: 'Rear camera',  value: '50MP Sony IMX882 + 8MP UW' },
          { key: 'Front',        value: '32MP AF' },
          { key: 'Water rating', value: 'IP65' },
        ],
        seoTitle: 'iQOO 15R 5G Review — Dimensity 9400e Flagship-Killer Under ₹35k',
        seoDescription: 'The iQOO 15R packs a Dimensity 9400e, 6000mAh silicon-carbon battery and 144Hz AMOLED — a flagship-killer under ₹35,000. Read our verdict.',
      },
      hi: {
        description: 'iQOO का सबसे आक्रामक मिड-रेंज: Dimensity 9400e, 6.78" 144Hz AMOLED, 6000mAh सिलिकॉन-कार्बन बैटरी और 100W FlashCharge।',
        shortReview: `iQOO 15R वो फ़ोन है जो ₹35,000 के फ़्लैगशिप-किलर सेगमेंट को दोबारा गर्म कर देता है। Dimensity 9400e एक 8-कोर, 4nm चिप है जो कई मामलों में 8 Gen 3 के क़रीब आता है, साथ में LPDDR5x और UFS 4.0 स्टोरेज।
बैटरी सबसे बड़ा सरप्राइज़ है — 6000 mAh, वो भी इतने पतले फ़ोन में, सिलिकॉन-कार्बन तकनीक से। सामान्य उपयोग में दो दिन आराम से। 100W FlashCharge 12 मिनट में 50% तक चार्ज कर देता है। 6.78" 1.5K 144Hz AMOLED का पीक 5000 निट्स है — दिल्ली की धूप में भी साफ़।
कैमरा में समझौता है। 50MP Sony IMX882 दिन में शानदार है, नाइट मोड ठीक, पर 8MP अल्ट्रावाइड सिर्फ़ स्पेक शीट के लिए है। अगर परफ़ॉर्मेंस, बैटरी और डिस्प्ले सबसे ऊपर हैं तो इस बजट में इसे मात देना मुश्किल है।`,
        pros: [
          'Dimensity 9400e — फ़्लैगशिप जैसी परफ़ॉर्मेंस',
          '6.78" 1.5K 144Hz AMOLED, 5000 निट्स',
          '6000 mAh सिलिकॉन-कार्बन बैटरी',
          '100W FlashCharge — ~30 मिनट में फ़ुल',
          'कस्टम वेपर-चैंबर कूलिंग',
          'IP65 धूल/छींटे प्रतिरोध',
        ],
        cons: [
          '8MP अल्ट्रावाइड कमज़ोर',
          'सिंगल स्पीकर, स्टीरियो नहीं',
          'FunTouch OS में ब्लोटवेयर',
          'वायरलेस चार्जिंग नहीं',
        ],
        specs: [
          { key: 'चिपसेट',       value: 'MediaTek Dimensity 9400e (4nm)' },
          { key: 'RAM',           value: '8 / 12 GB LPDDR5x' },
          { key: 'स्टोरेज',       value: '128 / 256 GB UFS 4.0' },
          { key: 'डिस्प्ले',      value: '6.78" 1.5K 144Hz AMOLED, 5000 निट्स' },
          { key: 'बैटरी',         value: '6000 mAh (सिलिकॉन-कार्बन)' },
          { key: 'चार्जिंग',      value: '100W वायर्ड FlashCharge' },
          { key: 'रियर कैमरा',    value: '50MP Sony IMX882 + 8MP UW' },
          { key: 'फ्रंट',         value: '32MP AF' },
          { key: 'वाटर रेटिंग',   value: 'IP65' },
        ],
        seoTitle: 'iQOO 15R 5G समीक्षा — ₹35,000 के अंदर Dimensity 9400e फ़्लैगशिप-किलर',
        seoDescription: 'Dimensity 9400e, 6000mAh सिलिकॉन-कार्बन बैटरी और 144Hz AMOLED — iQOO 15R ₹35,000 का सबसे मज़बूत फ़्लैगशिप-किलर।',
      },
    },
  }),

  product({
    slug: 'google-pixel-10',
    name: 'Google Pixel 10',
    category: 'mobiles',
    brand: 'Google', brandSlug: 'google',
    model: 'Pixel 10', modelSlug: 'pixel-10',
    affiliateLink: 'https://link.amazon/B0ijrA2bS',
    price: 79999, mrp: 84999, rating: 4.6, reviews: 3200,
    trending: true, featured: true,
    content: {
      en: {
        description: 'The Pixel 10 doubles down on Google’s AI-first phone thesis — a leaner Tensor G5, 6.3" 120Hz Actua display, best-in-class camera pipeline and 7 years of Android updates.',
        shortReview: `Google’s "safe" refresh is quietly the most complete Pixel yet. Tensor G5 is finally built on TSMC’s 3nm node, which fixes the thermal issues that dogged the G3/G4. Day-to-day everything feels snappy, and importantly, sustained performance in Maps + Gemini + camera no longer trips the battery.
The camera continues to be the reason to buy a Pixel. The 50MP main sensor with a new pixel-binning pipeline delivers Google’s trademark natural-tone JPEGs. Video Boost is now native at 8K/24, and Best Take + Magic Editor handle group photos with the sort of embarrassingly good results that will populate every wedding album in India.
The 6.3" Actua LTPO display peaks at 3000 nits — the phone is comfortable outdoors under harsh sun. Battery has grown to 4970 mAh; a full day is reliable, and 30W wired + 15W Qi wireless charge is finally acceptable.
Seven years of Android + Pixel Drops set the bar for updates in 2026.`,
        pros: [
          'Tensor G5 on TSMC 3nm — cooler & efficient',
          'Best-in-class computational photography',
          '6.3" LTPO Actua display, 3000 nits peak',
          '7 years of OS + security updates',
          'Native Gemini Nano assistant',
          'Class-leading Video Boost quality',
        ],
        cons: [
          'Expensive vs Chinese flagship-killers',
          '30W charging — slower than rivals',
          'No 3.5mm jack',
          'Not the fastest gaming phone',
        ],
        specs: [
          { key: 'Chipset',      value: 'Google Tensor G5 (TSMC 3nm)' },
          { key: 'RAM',          value: '12 GB LPDDR5x' },
          { key: 'Storage',      value: '128 / 256 / 512 GB UFS 4.0' },
          { key: 'Display',      value: '6.3" LTPO OLED 120Hz, 3000 nits' },
          { key: 'Battery',      value: '4970 mAh' },
          { key: 'Charging',     value: '30W wired + 15W Qi wireless' },
          { key: 'Rear camera',  value: '50MP main + 12MP UW + 12MP tele' },
          { key: 'Front',        value: '10.5MP AF' },
          { key: 'Water rating', value: 'IP68' },
          { key: 'Updates',      value: '7 years OS + security' },
        ],
        seoTitle: 'Google Pixel 10 Review — Tensor G5, Best Camera & 7-Year Updates',
        seoDescription: 'Tensor G5 on 3nm, a stunning Actua display and industry-leading computational photography — the Pixel 10 is the AI-first Android to buy in 2026.',
      },
      hi: {
        description: 'Pixel 10 गूगल की AI-फ़र्स्ट थीसिस को और गहरा करता है — TSMC 3nm पर Tensor G5, 6.3″ 120Hz डिस्प्ले, बेहतरीन कैमरा और 7 साल के अपडेट।',
        shortReview: `Google का यह "सुरक्षित" अपडेट असल में अब तक का सबसे पूर्ण Pixel है। Tensor G5 अब TSMC के 3nm प्रोसेस पर बना है, जिससे G3/G4 की थर्मल दिक़्क़तें हल हो गई हैं। Maps + Gemini + कैमरा एक साथ चलाने पर भी बैटरी और गर्मी संभले रहते हैं।
कैमरा वजह है Pixel ख़रीदने की। 50MP मुख्य सेंसर के साथ नया पिक्सल-बिनिंग पाइपलाइन Google की सिग्नेचर नैचुरल-टोन JPEG देता है। Video Boost अब नैटिव 8K/24 पर है, और Best Take + Magic Editor भारत की शादियों की तस्वीरों को नया जीवन देंगे।
6.3" Actua LTPO डिस्प्ले 3000 निट्स पीक — तेज़ धूप में भी आरामदायक। बैटरी 4970 mAh — पूरा दिन आराम से। 30W वायर्ड + 15W Qi वायरलेस चार्जिंग अब स्वीकार्य है।
7 साल के OS + Pixel Drops अपडेट 2026 का नया मानक हैं।`,
        pros: [
          'Tensor G5 (TSMC 3nm) — ठंडा और कुशल',
          'क्लास-लीडिंग कंप्यूटेशनल कैमरा',
          '6.3" LTPO Actua डिस्प्ले, 3000 निट्स',
          '7 साल OS + सुरक्षा अपडेट',
          'नैटिव Gemini Nano असिस्टेंट',
          'बेहतरीन Video Boost क्वालिटी',
        ],
        cons: [
          'चीनी फ़्लैगशिप-किलर की तुलना में महँगा',
          '30W चार्जिंग — प्रतिस्पर्धियों से धीमी',
          '3.5mm जैक नहीं',
          'सबसे तेज़ गेमिंग फ़ोन नहीं',
        ],
        specs: [
          { key: 'चिपसेट',       value: 'Google Tensor G5 (TSMC 3nm)' },
          { key: 'RAM',           value: '12 GB LPDDR5x' },
          { key: 'स्टोरेज',       value: '128 / 256 / 512 GB UFS 4.0' },
          { key: 'डिस्प्ले',      value: '6.3" LTPO OLED 120Hz, 3000 निट्स' },
          { key: 'बैटरी',         value: '4970 mAh' },
          { key: 'चार्जिंग',      value: '30W वायर्ड + 15W Qi वायरलेस' },
          { key: 'रियर कैमरा',    value: '50MP मुख्य + 12MP UW + 12MP टेली' },
          { key: 'फ्रंट',         value: '10.5MP AF' },
          { key: 'वाटर रेटिंग',   value: 'IP68' },
          { key: 'अपडेट',         value: '7 साल OS + सुरक्षा' },
        ],
        seoTitle: 'Google Pixel 10 समीक्षा — Tensor G5, बेहतरीन कैमरा और 7 साल अपडेट',
        seoDescription: 'TSMC 3nm पर Tensor G5, शानदार Actua डिस्प्ले और उद्योग-अग्रणी कैमरा — 2026 में AI-फ़र्स्ट एंड्रॉयड ख़रीदने का सबसे अच्छा फ़ोन।',
      },
    },
  }),

  product({
    slug: 'realme-narzo-90x-5g',
    name: 'realme NARZO 90x 5G',
    category: 'mobiles',
    brand: 'realme', brandSlug: 'realme',
    model: 'NARZO 90x 5G', modelSlug: 'narzo-90x-5g',
    affiliateLink: 'https://link.amazon/B0a6MQN5I',
    price: 14999, mrp: 17999, rating: 4.3, reviews: 4500,
    trending: true, todaysDeal: true,
    content: {
      en: {
        description: 'realme’s value-4G killer goes 5G: Dimensity 6300, 120Hz LCD, 6000 mAh battery and 45W SUPERVOOC — a lot of phone for ₹15,000.',
        shortReview: `The NARZO 90x plays the volume game — every big spec box checked at a truly aggressive price. Dimensity 6300 handles Genshin at low settings and BGMI at Balanced 60fps without meaningful stutter. The 120Hz LCD is a proper punch-hole panel, and while it doesn’t compete with AMOLED, colours look natural and touch response is snappy.
Battery life is genuinely great — the 6000 mAh cell gets to two full days for lighter users. 45W SUPERVOOC charges 0-50% in about 20 minutes. Cameras are the usual budget affair: the 50MP main is fine in daylight, low-light struggles.
Bloatware in Realme UI is still real, but you can uninstall the majority of it. If you want a 5G workhorse for calling, WhatsApp, YouTube and casual gaming without paying ₹20k, this is the smart pick.`,
        pros: [
          'Dimensity 6300 (5G, 6nm)',
          '6000 mAh two-day battery',
          '45W SUPERVOOC charging',
          '120Hz LCD with 950 nits peak',
          'Military-grade shock rating',
          'Great value at ₹14,999',
        ],
        cons: [
          'LCD, not AMOLED',
          'Bloatware in Realme UI',
          'Low-light camera is average',
          'No IP rating',
        ],
        specs: [
          { key: 'Chipset',      value: 'MediaTek Dimensity 6300 (6nm)' },
          { key: 'RAM',          value: '6 / 8 GB LPDDR4x' },
          { key: 'Storage',      value: '128 GB UFS 2.2' },
          { key: 'Display',      value: '6.72" FHD+ LCD 120Hz' },
          { key: 'Battery',      value: '6000 mAh' },
          { key: 'Charging',     value: '45W SUPERVOOC' },
          { key: 'Rear camera',  value: '50MP main + AI portrait' },
          { key: 'Front',        value: '8MP' },
        ],
        seoTitle: 'realme NARZO 90x 5G Review — 6000 mAh Under ₹15,000',
        seoDescription: 'Dimensity 6300, 6000 mAh battery and 45W charging — the realme NARZO 90x is the smart 5G buy under ₹15,000 in 2026.',
      },
      hi: {
        description: 'realme NARZO 90x 5G: Dimensity 6300, 120Hz LCD, 6000 mAh बैटरी और 45W SUPERVOOC — ₹15,000 में बहुत बड़ा पैकेज।',
        shortReview: `NARZO 90x वो फ़ोन है जो हर बड़ा फ़ीचर बहुत आक्रामक कीमत पर देता है। Dimensity 6300 Genshin को कम सेटिंग्स पर और BGMI को Balanced 60fps पर बिना ज़्यादा हकलाहट के चलाता है। 120Hz LCD अच्छा पंच-होल पैनल है — AMOLED से मुक़ाबला नहीं पर रंग नैचुरल हैं और टच अच्छा है।
बैटरी सच में शानदार है — 6000 mAh हल्के उपयोग में दो दिन चलती है। 45W SUPERVOOC 20 मिनट में 50% चार्ज कर देता है। कैमरा बजट टाइप का है — 50MP मुख्य दिन में ठीक, कम रोशनी में कमज़ोर।
Realme UI में ब्लोटवेयर है, अधिकांश अनइंस्टॉल हो जाता है। अगर ₹20,000 से कम में 5G, कॉलिंग, WhatsApp, YouTube और कैज़ुअल गेमिंग चाहिए तो यह स्मार्ट चुनाव है।`,
        pros: [
          'Dimensity 6300 (5G, 6nm)',
          '6000 mAh — दो दिन बैटरी',
          '45W SUPERVOOC चार्जिंग',
          '120Hz LCD, 950 निट्स पीक',
          'मिलिट्री-ग्रेड शॉक रेटिंग',
          '₹14,999 में शानदार वैल्यू',
        ],
        cons: [
          'LCD, AMOLED नहीं',
          'Realme UI में ब्लोटवेयर',
          'कम रोशनी में कैमरा औसत',
          'IP रेटिंग नहीं',
        ],
        specs: [
          { key: 'चिपसेट',       value: 'MediaTek Dimensity 6300 (6nm)' },
          { key: 'RAM',           value: '6 / 8 GB LPDDR4x' },
          { key: 'स्टोरेज',       value: '128 GB UFS 2.2' },
          { key: 'डिस्प्ले',      value: '6.72" FHD+ LCD 120Hz' },
          { key: 'बैटरी',         value: '6000 mAh' },
          { key: 'चार्जिंग',      value: '45W SUPERVOOC' },
          { key: 'रियर कैमरा',    value: '50MP मुख्य + AI पोर्ट्रेट' },
          { key: 'फ्रंट',         value: '8MP' },
        ],
        seoTitle: 'realme NARZO 90x 5G समीक्षा — ₹15,000 के अंदर 6000 mAh बैटरी',
        seoDescription: 'Dimensity 6300, 6000 mAh बैटरी और 45W चार्जिंग — realme NARZO 90x ₹15,000 के अंदर सबसे स्मार्ट 5G विकल्प।',
      },
    },
  }),

  product({
    slug: 'oneplus-15',
    name: 'OnePlus 15',
    category: 'mobiles',
    brand: 'OnePlus', brandSlug: 'oneplus',
    model: 'OnePlus 15', modelSlug: 'oneplus-15',
    affiliateLink: 'https://link.amazon/B05ub7EQ1',
    price: 69999, mrp: 74999, rating: 4.5, reviews: 4900,
    trending: true, featured: true, todaysDeal: true,
    content: {
      en: {
        description: 'OnePlus returns to its performance-first roots: Snapdragon 8 Elite Gen 5, 6.78" 165Hz AMOLED, 7300 mAh silicon-carbon battery and Hasselblad-tuned triple cameras.',
        shortReview: `The OnePlus 15 is easily the most refined "Never Settle" phone in years. The Snapdragon 8 Elite Gen 5 stays cool under sustained gaming loads thanks to a genuinely oversized vapour chamber. Combined with 165Hz LTPO AMOLED, this is the smoothest OnePlus screen ever — 3200 nits peak brightness means it’s comfortably readable in Indian summer sun.
Battery is a headline: 7300 mAh silicon-carbon in a phone that still weighs under 210 g. Two-day life is realistic for most people. 120W SUPERVOOC + 50W AIRVOOC round out the charging story.
Cameras have finally matured — the 50 MP Sony LYT-808 main and 50 MP 3x periscope tele deliver Hasselblad’s signature colour science, and low-light images are night-and-day better than the OnePlus 12. OxygenOS 15 is fluid, focused and mostly ad-free.
For anyone who wants a flagship without going near the ₹1L mark, this beats the equivalent Samsung and Vivo comfortably.`,
        pros: [
          'Snapdragon 8 Elite Gen 5 — best-in-class perf.',
          '6.78" LTPO AMOLED 165Hz, 3200 nits',
          '7300 mAh silicon-carbon battery',
          '120W wired + 50W wireless charging',
          'Hasselblad-tuned triple cameras',
          'Fluid OxygenOS 15, minimal bloat',
        ],
        cons: [
          '2x optical zoom on ultrawide is basic',
          'Slightly slippery matte back',
          'No expandable storage',
          'Alert slider tuning still needs work',
        ],
        specs: [
          { key: 'Chipset',      value: 'Snapdragon 8 Elite Gen 5 (3nm)' },
          { key: 'RAM',          value: '12 / 16 GB LPDDR5x' },
          { key: 'Storage',      value: '256 / 512 GB UFS 4.0' },
          { key: 'Display',      value: '6.78" LTPO AMOLED 165Hz, 3200 nits' },
          { key: 'Battery',      value: '7300 mAh (Silicon-Carbon)' },
          { key: 'Charging',     value: '120W SUPERVOOC + 50W AIRVOOC' },
          { key: 'Rear camera',  value: '50MP LYT-808 + 50MP UW + 50MP 3x tele' },
          { key: 'Front',        value: '32MP' },
          { key: 'Water rating', value: 'IP68/IP69' },
        ],
        seoTitle: 'OnePlus 15 Review — 8 Elite Gen 5 Flagship With 7300 mAh Battery',
        seoDescription: 'Snapdragon 8 Elite Gen 5, 165Hz AMOLED, 7300 mAh silicon-carbon battery and Hasselblad cameras — the OnePlus 15 is the flagship to beat.',
      },
      hi: {
        description: 'OnePlus 15 फिर से "परफ़ॉर्मेंस-फ़र्स्ट": Snapdragon 8 Elite Gen 5, 6.78″ 165Hz AMOLED, 7300 mAh बैटरी और Hasselblad कैमरे।',
        shortReview: `OnePlus 15 बीते सालों का सबसे परिष्कृत "Never Settle" फ़ोन है। Snapdragon 8 Elite Gen 5 बड़े वेपर-चैंबर के साथ लंबे गेमिंग सत्र में भी ठंडा रहता है। 165Hz LTPO AMOLED — OnePlus की अब तक की सबसे स्मूथ स्क्रीन — 3200 निट्स पीक ब्राइटनेस भारतीय गर्मी में भी साफ़ पढ़ने योग्य।
बैटरी हेडलाइन है: 7300 mAh सिलिकॉन-कार्बन, फ़ोन का वज़न 210 g से कम। ज़्यादातर लोगों के लिए दो दिन आराम से। 120W SUPERVOOC + 50W AIRVOOC चार्जिंग की कहानी पूरी करते हैं।
कैमरे अब वयस्क हो गए हैं — 50 MP Sony LYT-808 और 50 MP 3x पेरिस्कोप टेली Hasselblad के कलर साइंस के साथ आते हैं, कम रोशनी की तस्वीरें OnePlus 12 से बहुत बेहतर हैं। OxygenOS 15 तेज़, केंद्रित और अधिकांश विज्ञापन-मुक्त है।
अगर ₹1 लाख से नीचे फ़्लैगशिप चाहिए तो यह Samsung और Vivo को आराम से पीछे छोड़ता है।`,
        pros: [
          'Snapdragon 8 Elite Gen 5 — सर्वश्रेष्ठ परफ़ॉर्मेंस',
          '6.78" LTPO AMOLED 165Hz, 3200 निट्स',
          '7300 mAh सिलिकॉन-कार्बन बैटरी',
          '120W वायर्ड + 50W वायरलेस चार्जिंग',
          'Hasselblad-ट्यून ट्रिपल कैमरा',
          'तेज़ OxygenOS 15, कम ब्लोट',
        ],
        cons: [
          'अल्ट्रावाइड का 2x जूम बेसिक है',
          'मैट बैक थोड़ा फिसलन भरा',
          'एक्सपैंडेबल स्टोरेज नहीं',
          'अलर्ट स्लाइडर ट्यूनिंग सुधारी जा सकती है',
        ],
        specs: [
          { key: 'चिपसेट',       value: 'Snapdragon 8 Elite Gen 5 (3nm)' },
          { key: 'RAM',           value: '12 / 16 GB LPDDR5x' },
          { key: 'स्टोरेज',       value: '256 / 512 GB UFS 4.0' },
          { key: 'डिस्प्ले',      value: '6.78" LTPO AMOLED 165Hz, 3200 निट्स' },
          { key: 'बैटरी',         value: '7300 mAh (सिलिकॉन-कार्बन)' },
          { key: 'चार्जिंग',      value: '120W SUPERVOOC + 50W AIRVOOC' },
          { key: 'रियर कैमरा',    value: '50MP LYT-808 + 50MP UW + 50MP 3x टेली' },
          { key: 'फ्रंट',         value: '32MP' },
          { key: 'वाटर रेटिंग',   value: 'IP68/IP69' },
        ],
        seoTitle: 'OnePlus 15 समीक्षा — 8 Elite Gen 5 और 7300 mAh बैटरी',
        seoDescription: 'Snapdragon 8 Elite Gen 5, 165Hz AMOLED, 7300 mAh बैटरी और Hasselblad कैमरे — 2026 का पीटने लायक फ़्लैगशिप।',
      },
    },
  }),

  // ============================== PRINTERS ==============================
  product({
    slug: 'brother-dcp-t830dw',
    name: 'Brother DCP-T830DW Wi-Fi Duplex Ink Tank Printer',
    category: 'printers',
    brand: 'Brother', brandSlug: 'brother',
    model: 'DCP-T830DW', modelSlug: 'dcp-t830dw',
    affiliateLink: 'https://link.amazon/B088YI9yJ',
    price: 15990, mrp: 21990, rating: 4.5, reviews: 2100,
    featured: true,
    content: {
      en: {
        description: 'Brother’s DCP-T830DW brings auto-duplex, Wi-Fi Direct and refillable ink tanks — ideal for home offices that print a few hundred pages a month.',
        shortReview: `The DCP-T830DW is one of those printers that just quietly works. The refillable ink-tank setup means you get roughly 7,500 mono pages and 5,000 colour pages per bottle set — the cost-per-page falls to under 30 paise, which shames every cartridge printer out there.
Auto-duplex is a real time-saver for CA offices and home schoolers. Wi-Fi Direct works reliably with Android, iOS and Windows. Print speed sits at about 17 ppm mono and 10 ppm colour, which is fair for the price. Copy and scan quality are perfectly adequate for invoices, forms and school assignments.
It’s not fancy — no ADF, no touchscreen, no fax — but the fundamentals are rock solid. For families with kids, small shops and freelancers, this is the safe long-term buy.`,
        pros: [
          'Very low cost per page — ~₹0.28 mono',
          'Automatic 2-sided printing',
          'Wi-Fi Direct + mobile printing',
          'High-yield ink tanks',
          'Compact footprint',
          '3-year on-site warranty',
        ],
        cons: [
          'No automatic document feeder (ADF)',
          'Basic mono LCD, no touchscreen',
          'Slower than laser for text-heavy jobs',
          'Colour prints on photo paper are okay, not great',
        ],
        specs: [
          { key: 'Type',            value: 'Ink tank, colour multifunction' },
          { key: 'Functions',       value: 'Print, Copy, Scan' },
          { key: 'Auto-duplex',     value: 'Yes' },
          { key: 'Connectivity',    value: 'Wi-Fi, Wi-Fi Direct, USB' },
          { key: 'Print speed',     value: '17 ppm mono / 10 ppm colour' },
          { key: 'Duty cycle',      value: 'Up to 2,500 pages/mo' },
          { key: 'Warranty',        value: '3 years on-site' },
        ],
        seoTitle: 'Brother DCP-T830DW Review — Best Home Ink Tank Printer 2026',
        seoDescription: 'Auto-duplex, Wi-Fi Direct and refillable ink tanks — the Brother DCP-T830DW is the safest home office printer buy in 2026.',
      },
      hi: {
        description: 'Brother DCP-T830DW: ऑटो-डुप्लेक्स, Wi-Fi Direct और रिफिलेबल इंक टैंक — घर के ऑफ़िस के लिए आदर्श।',
        shortReview: `DCP-T830DW वो प्रिंटर है जो चुपचाप काम करता रहता है। रिफिलेबल इंक-टैंक सेटअप से एक बॉटल सेट से लगभग 7,500 मोनो और 5,000 रंगीन पृष्ठ मिलते हैं — कॉस्ट-पर-पेज 30 पैसे से कम आती है।
ऑटो-डुप्लेक्स CA ऑफ़िस और होम-स्कूलिंग के लिए बड़ा टाइम सेवर है। Wi-Fi Direct Android, iOS और Windows के साथ बढ़िया काम करता है। प्रिंट स्पीड ~17 ppm मोनो और 10 ppm रंगीन। कॉपी और स्कैन क्वालिटी बिल, फ़ॉर्म और स्कूल असाइनमेंट के लिए पर्याप्त।
कोई फ़ैंसी टचस्क्रीन, ADF या फ़ैक्स नहीं — पर बेसिक्स एकदम मज़बूत। बच्चों वाले परिवार, छोटी दुकान और फ़्रीलांसर के लिए यह सुरक्षित लंबी अवधि का चुनाव है।`,
        pros: [
          'बहुत कम कॉस्ट-पर-पेज (~₹0.28 मोनो)',
          'ऑटोमेटिक दो-तरफ़ा प्रिंटिंग',
          'Wi-Fi Direct + मोबाइल प्रिंटिंग',
          'हाई-यील्ड इंक टैंक',
          'कॉम्पैक्ट डिज़ाइन',
          '3 साल की ऑन-साइट वारंटी',
        ],
        cons: [
          'ADF नहीं',
          'बेसिक मोनो LCD',
          'लेज़र से धीमा (टेक्स्ट में)',
          'फ़ोटो पेपर पर रंग औसत',
        ],
        specs: [
          { key: 'प्रकार',           value: 'इंक टैंक, रंगीन मल्टीफ़ंक्शन' },
          { key: 'फ़ंक्शन्स',        value: 'प्रिंट, कॉपी, स्कैन' },
          { key: 'ऑटो-डुप्लेक्स',    value: 'हाँ' },
          { key: 'कनेक्टिविटी',      value: 'Wi-Fi, Wi-Fi Direct, USB' },
          { key: 'प्रिंट स्पीड',     value: '17 ppm मोनो / 10 ppm रंगीन' },
          { key: 'ड्यूटी साइकल',     value: '2,500 पेज/माह तक' },
          { key: 'वारंटी',           value: '3 साल ऑन-साइट' },
        ],
        seoTitle: 'Brother DCP-T830DW समीक्षा — 2026 का बेस्ट होम इंक टैंक प्रिंटर',
        seoDescription: 'ऑटो-डुप्लेक्स, Wi-Fi Direct और रिफिलेबल इंक टैंक के साथ Brother DCP-T830DW होम ऑफ़िस के लिए सुरक्षित विकल्प।',
      },
    },
  }),

  product({
    slug: 'brother-dcp-t730dw',
    name: 'Brother DCP-T730DW Wi-Fi Ink Tank Printer',
    category: 'printers',
    brand: 'Brother', brandSlug: 'brother',
    model: 'DCP-T730DW', modelSlug: 'dcp-t730dw',
    affiliateLink: 'https://link.amazon/B07kPkfzL',
    price: 13990, mrp: 18990, rating: 4.4, reviews: 3400,
    todaysDeal: true,
    content: {
      en: {
        description: 'The DCP-T730DW is the budget sibling of the T830DW — same refillable ink tanks and Wi-Fi Direct, without the auto-duplex. A no-nonsense ink tank for students and small households.',
        shortReview: `If you don’t print on both sides often, the DCP-T730DW saves you ~₹2,000 over the T830DW without changing anything meaningful about print quality or ink economics. You still get up to 7,500 mono pages and 5,000 colour pages per refill set. Wi-Fi Direct works out of the box with any modern phone.
Speed is 17 ppm mono / 9.5 ppm colour, and the borderless photo mode is competent for A4 school projects. What you give up is auto-duplex — practical if you only print occasionally, but a pain if you’re producing 20-page reports weekly.
It’s otherwise nearly identical to the T830DW: 3-year on-site warranty, compact design, and Brother’s excellent Indian service network.`,
        pros: [
          'Best cost-per-page in class',
          'Wi-Fi Direct + mobile printing',
          'High-yield refillable ink tanks',
          'Compact footprint',
          '3-year on-site warranty',
          'Cheaper than T830DW',
        ],
        cons: [
          'No auto-duplex printing',
          'No ADF, no touchscreen',
          'Photo quality is basic',
          'Loud in high-quality mode',
        ],
        specs: [
          { key: 'Type',            value: 'Ink tank, colour multifunction' },
          { key: 'Functions',       value: 'Print, Copy, Scan' },
          { key: 'Auto-duplex',     value: 'No' },
          { key: 'Connectivity',    value: 'Wi-Fi, Wi-Fi Direct, USB' },
          { key: 'Print speed',     value: '17 ppm mono / 9.5 ppm colour' },
          { key: 'Warranty',        value: '3 years on-site' },
        ],
        seoTitle: 'Brother DCP-T730DW Review — Budget Ink Tank Printer Under ₹15k',
        seoDescription: 'Wi-Fi Direct, refillable ink tanks and 3-year warranty — the Brother DCP-T730DW is the practical budget ink tank buy under ₹15,000.',
      },
      hi: {
        description: 'DCP-T730DW — DCP-T830DW का बजट भाई। वही रिफिलेबल इंक टैंक और Wi-Fi Direct, ऑटो-डुप्लेक्स के बिना।',
        shortReview: `अगर आप अक्सर दोनों तरफ़ प्रिंट नहीं करते, DCP-T730DW T830DW के मुक़ाबले ~₹2,000 बचाता है — प्रिंट क्वालिटी और इंक इकोनॉमिक्स वही रहते हैं। रिफ़िल सेट से 7,500 मोनो और 5,000 रंगीन पेज मिलते हैं। Wi-Fi Direct किसी भी आधुनिक फ़ोन के साथ सीधे काम करता है।
स्पीड 17 ppm मोनो / 9.5 ppm रंगीन, और A4 स्कूल प्रोजेक्ट के लिए बॉर्डरलेस फ़ोटो मोड ठीक है। कमी सिर्फ़ ऑटो-डुप्लेक्स — कभी-कभार प्रिंट करते हैं तो कोई फ़र्क़ नहीं, हर हफ़्ते 20-पन्नों की रिपोर्ट देते हैं तो दिक़्क़त।
बाकी T830DW जैसा ही — 3 साल ऑन-साइट वारंटी, कॉम्पैक्ट डिज़ाइन और Brother की भरोसेमंद इंडिया सर्विस।`,
        pros: [
          'क्लास का सबसे कम कॉस्ट-पर-पेज',
          'Wi-Fi Direct + मोबाइल प्रिंटिंग',
          'हाई-यील्ड रिफिलेबल इंक टैंक',
          'कॉम्पैक्ट डिज़ाइन',
          '3 साल ऑन-साइट वारंटी',
          'T830DW से सस्ता',
        ],
        cons: [
          'ऑटो-डुप्लेक्स नहीं',
          'ADF या टचस्क्रीन नहीं',
          'फ़ोटो क्वालिटी बेसिक',
          'हाई-क्वालिटी मोड में शोर',
        ],
        specs: [
          { key: 'प्रकार',           value: 'इंक टैंक, रंगीन मल्टीफ़ंक्शन' },
          { key: 'फ़ंक्शन्स',        value: 'प्रिंट, कॉपी, स्कैन' },
          { key: 'ऑटो-डुप्लेक्स',    value: 'नहीं' },
          { key: 'कनेक्टिविटी',      value: 'Wi-Fi, Wi-Fi Direct, USB' },
          { key: 'प्रिंट स्पीड',     value: '17 ppm मोनो / 9.5 ppm रंगीन' },
          { key: 'वारंटी',           value: '3 साल ऑन-साइट' },
        ],
        seoTitle: 'Brother DCP-T730DW समीक्षा — ₹15,000 से कम में इंक टैंक प्रिंटर',
        seoDescription: 'Wi-Fi Direct, रिफिलेबल इंक टैंक और 3 साल वारंटी — Brother DCP-T730DW ₹15,000 से कम में व्यावहारिक ख़रीद।',
      },
    },
  }),
];

// Extra taxonomy that isn't in defaults — must be created before products.
module.exports.EXTRA_BRANDS = [
  { slug: 'iqoo', name: 'iQOO' },
  { slug: 'brother', name: 'Brother' },
];

module.exports.MODELS = module.exports.PRODUCTS.map(p => ({
  slug: p.modelSlug,
  name: p.model,
  brandSlug: p.brandSlug,
  categorySlug: p.category,
}));
