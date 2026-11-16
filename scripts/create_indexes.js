import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'dealpicker';

if (!uri) {
  console.error('MONGO_URL is required. Set it in your shell before running this script.');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 8000,
  maxPoolSize: 2,
});

try {
  await client.connect();
  const db = client.db(dbName);

  const definitions = {
    products: [
      [{ published: 1, createdAt: -1 }, { name: 'products_published_createdAt' }],
      [{ published: 1, category: 1, createdAt: -1 }, { name: 'products_published_category_createdAt' }],
      [{ published: 1, brandSlug: 1, createdAt: -1 }, { name: 'products_published_brand_createdAt' }],
      [{ published: 1, trending: 1, createdAt: -1 }, { name: 'products_published_trending_createdAt' }],
      [{ published: 1, todaysDeal: 1, createdAt: -1 }, { name: 'products_published_todaysDeal_createdAt' }],
      [{ slug: 1, published: 1 }, { name: 'products_slug_published' }],
    ],
    taxonomy_categories: [
      [{ order: 1 }, { name: 'taxonomy_categories_order' }],
    ],
    taxonomy_brands: [
      [{ order: 1, name: 1 }, { name: 'taxonomy_brands_order_name' }],
      [{ slug: 1 }, { name: 'taxonomy_brands_slug' }],
    ],
    taxonomy_models: [
      [{ name: 1 }, { name: 'taxonomy_models_name' }],
      [{ brandSlug: 1, categorySlug: 1 }, { name: 'taxonomy_models_brand_category' }],
    ],
    guides: [
      [{ published: 1, createdAt: -1 }, { name: 'guides_published_createdAt' }],
      [{ slug: 1, published: 1 }, { name: 'guides_slug_published' }],
    ],
    reviews: [
      [{ published: 1, createdAt: -1 }, { name: 'reviews_published_createdAt' }],
      [{ slug: 1, published: 1 }, { name: 'reviews_slug_published' }],
    ],
    admins: [
      [{ email: 1 }, { name: 'admins_email' }],
    ],
    login_attempts: [
      [{ identifier: 1 }, { name: 'login_attempts_identifier' }],
    ],
  };

  for (const [collection, indexes] of Object.entries(definitions)) {
    const result = await db.collection(collection).createIndexes(
      indexes.map(([key, options]) => ({ key, ...options }))
    );
    console.log(collection + ': ' + result.length + ' indexes ensured');
  }

  console.log('DealPicker database indexes are ready.');
} catch (error) {
  console.error('Index creation failed:', error.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
