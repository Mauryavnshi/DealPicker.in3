# DealPicker — Product Requirements Document

## Original problem statement (verbatim summary)
Upgrade the existing DealPicker Next.js project (dealpicker.in) into a **premium, minimal, mobile-first technology deals platform** for Amazon affiliate products. Dark theme with orange accent, full EN/HI language switch, working JWT admin auth (admin panel deferred), empty-state-friendly backend (no fake products), Next.js API routes only, MongoDB as the data layer.

## Tech stack
- Next.js 15 (App Router) · React 19 · Tailwind CSS · shadcn/ui primitives
- MongoDB (via `lib/mongodb.js` `getDb()`)
- Auth: `bcryptjs` + `jsonwebtoken`
- i18n: custom EN/HI dictionary with LocalStorage persistence
- Sonner (toasts), next-themes (dark/light)

## User personas
1. **Deal hunter** — visits home, scans today's deals, taps a category, clicks View Deal.
2. **Researcher** — reads buying guides / reviews / comparisons before deciding.
3. **Newsletter subscriber** — wants curated deals weekly.
4. **Admin (single seat)** — signs into `/admin/login`, will eventually manage products/brands/guides.

## Architecture (implemented)
```
app/
  layout.js         Root layout: theme + language providers, Header, Footer, BackToTop
  page.js           Home (hero + categories + brands + deals sections + newsletter)
  loading.js        Global loading skeletons
  not-found.js      Custom 404
  sitemap.js        Dynamic sitemap
  robots.js         robots.txt (disallow /admin, /api)
  api/[[...path]]/  Single catch-all API route:
    /api/health
    /api/auth/admin/login   (bcrypt + jwt 7d)
    /api/auth/admin/me      (Bearer or cookie)
    /api/auth/admin/logout
    /api/products (+ [slug])  CRUD (POST/PUT/DELETE admin-guarded)
    /api/categories
    /api/brands
    /api/search
    /api/newsletter/subscribe
    /api/contact
  category/[slug]/page.js
  brand/[slug]/page.js
  product/[slug]/page.js
  admin/login/page.js
  admin/page.js          (control-room shell, modules marked Soon)
  todays-deals, trending, buying-guides, reviews, comparisons
  about, contact
  legal/{affiliate-disclosure,privacy,terms,disclaimer,refund}
components/
  layout/  Header · MobileDrawer · SearchOverlay · Footer · BackToTop · Breadcrumb
  home/    Hero · CategoryGrid · FeaturedBrands · ProductSection · Newsletter
  product/ ProductCard · ProductGrid · ProductSkeleton
  common/  Logo · LanguageSwitcher · ThemeToggle · EmptyState · LegalPage
lib/
  data/{categories,brands}.js
  i18n/{dictionary,LanguageContext}.js
  auth/jwt.js
  mongodb.js  format.js  seed.js (empty)
```

## What's implemented (Jan 2026)
- **Design system**: Cabinet Grotesk display + Satoshi body + JetBrains Mono numerics · orange accent (HSL 24 95% 58%) on layered dark palette · glass navbar · hero grid-lines + radial glow + noise · marquee brand rail · premium product card (empty-safe).
- **Sticky navbar**: Logo · desktop centre nav · Search overlay with keyboard nav & instant suggestions · Theme toggle · EN/HI switch · Admin button.
- **Mobile hamburger drawer**: 360px animated left drawer with all categories, nav links, socials, language & theme controls.
- **Home**: hero with CTA, live stats, category grid (10 items), featured-brands marquee (15), empty-state deals section, newsletter section.
- **Product card** (ready but hidden until products exist): image, brand, title, rating, price + strike-through MRP, discount %, Prime badge, wishlist & share, affiliate disclosure, View Deal.
- **Full EN/HI i18n** — every UI string translated; persists to localStorage `dp_locale`.
- **JWT admin auth** — `/admin/login` → `/admin` shell; bcrypt hashing, 7-day JWT, cookie + Bearer, 5-attempt brute-force lockout.
- **Legal + info pages**: About, Contact (form), Affiliate Disclosure, Privacy, Terms, Disclaimer, Refund. All EN/HI.
- **SEO**: dynamic metadata, OpenGraph, Twitter cards, Organization + Product JSON-LD, canonical URL, sitemap.xml, robots.txt.
- **Accessibility**: focus-visible outlines, ARIA labels, keyboard nav in search overlay, reduced-motion query, prose contrast.
- **Testing**: 100% pass on backend pytest suite + frontend Playwright checks (iteration 1).

## Prioritized backlog

### P0 — MVP delta (owned by user)
- Admin panel UI to create/edit/publish products (endpoints already live).
- Real product content (deals, images, affiliate links).

### P1 — Content & growth
- Buying guides, reviews, comparisons authoring (currently show empty state).
- Wishlist page reading from `dp_wishlist` localStorage.
- Deal alerts / price-drop notification signup.

### P2 — Polish
- Return HTTP 404 (via `notFound()`) for invalid dynamic slugs; today it renders 404 UI with 200.
- Convert Fontshare CDN to `next/font` local hosting for perf.
- ISR/SSG for category & product pages once products land.

## Environment variables (`/app/.env`)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=dealpicker
ADMIN_EMAIL=admin@dealpicker.in
ADMIN_PASSWORD=dealpicker2025
ADMIN_JWT_SECRET=dp_jwt_supersecret_change_me_in_prod_2026
NEXT_PUBLIC_SITE_URL=https://dealpicker.in
```

## Runbook
- `sudo supervisorctl restart frontend` — after `.env` or dependency changes.
- Backend is served by Next.js under `/api/*`. Do **not** add a separate FastAPI service.
- Default admin credentials in `memory/test_credentials.md`.
