# DealPicker.in

> A premium Amazon affiliate deals platform for India — smartphones, earbuds, and laptops. Apple/Linear-style UI, dark/light mode, admin panel, MongoDB backend.

![Stack](https://img.shields.io/badge/Next.js-15-black) ![MongoDB](https://img.shields.io/badge/MongoDB-Green) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black)

## ✨ Features (Phase 1 — shipped)
- Premium responsive UI with dark/light mode & glassmorphism
- Sticky glass header with theme-aware DealPicker logo
- Hero, category rail, live search
- Sectioned product grids: Today's Deals · Trending · Featured · All
- Product detail page: image gallery, price + discount, Amazon affiliate CTA, tabs (Overview / Specs / Pros & Cons), related products
- Admin panel (password-gated): full CRUD, publish/draft, category & flags
- MongoDB-backed REST API under `/api/*`
- 9 auto-seeded sample products (Apple, Samsung, OnePlus, Sony, boAt, Dell, ASUS …)

## 🗺️ Phase 2 (planned)
- Bilingual (Hindi + English) routing
- SEO stack (JSON-LD Product/Review/FAQ schemas, sitemap.xml, robots.txt, dynamic OG tags)
- Postgres + Prisma migration path
- Auth.js (NextAuth) session-based admin
- Cloudinary image uploads
- Remaining categories (Smartwatches, TVs, Printers, Brands)
- Legal pages (Privacy, Terms, Disclaimer, Affiliate Disclosure)
- GA4 + Microsoft Clarity + Search Console

## 🚀 Getting Started

### 1. Install
```bash
yarn install
```

### 2. Environment
Copy `.env.example` to `.env` and update:
```bash
cp .env.example .env
```

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=dealpicker
ADMIN_PASSWORD=change-me-in-production
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run
```bash
yarn dev
```
Open http://localhost:3000 — the DB auto-seeds 9 sample products on first hit.

### 4. Access Admin
1. Click **Admin** in the header
2. Password: value of `ADMIN_PASSWORD` (default `dealpicker2025`)
3. Add / edit / delete products, toggle Trending / Today's Deal / Featured / Publish

## 🗂️ Project Structure
```
app/
├── app/
│   ├── api/[[...path]]/route.js   # Catch-all REST API (products, auth, seed)
│   ├── layout.js                  # Root layout (fonts, theme provider, toaster)
│   ├── page.js                    # Full app: home, product view, admin panel
│   └── globals.css                # Tailwind + design tokens + glassmorphism
├── components/ui/                 # shadcn/ui primitives
├── lib/
│   ├── mongodb.js                 # Cached Mongo connection
│   └── seed.js                    # Sample product seed data
├── public/
│   ├── logo-dark.png              # Logo shown on dark theme
│   └── logo-light.png             # Logo shown on light theme
└── .env.example
```

## 🔌 API Reference

| Method | Endpoint                     | Auth   | Purpose                          |
|--------|------------------------------|--------|----------------------------------|
| GET    | `/api/health`                | –      | Health check                     |
| GET    | `/api/categories`            | –      | List categories                  |
| GET    | `/api/products`              | –      | List published (query: `category`, `admin=true`) |
| GET    | `/api/products/:slug`        | –      | Single product                   |
| POST   | `/api/products`              | Bearer | Create product                   |
| PUT    | `/api/products/:id`          | Bearer | Update product                   |
| DELETE | `/api/products/:id`          | Bearer | Delete product                   |
| POST   | `/api/admin/login`           | –      | Exchange password for token      |

All product-write endpoints require `Authorization: Bearer <token>` obtained from `/api/admin/login`.

## 🚀 Deploy to Vercel
1. Push this repo to GitHub
2. Import into Vercel
3. Add the env vars (`MONGO_URL`, `DB_NAME`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_BASE_URL`)
4. Deploy — Vercel auto-detects Next.js 15

For MongoDB in production, use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier is enough to start).

## 📝 Amazon Affiliate Setup
Replace the sample `?tag=dealpicker-21` in seed URLs with **your** Amazon Associates tag (e.g. `?tag=yourtag-21`). Every new product added via admin should include your tag in the affiliate link.

## 📄 License
MIT — build freely, credit appreciated.
