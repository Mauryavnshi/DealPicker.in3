import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'dealpicker';

let cached = global._mongo;
if (!cached) cached = global._mongo = { client: null, promise: null };

export async function getDb() {
  if (cached.client) return cached.client.db(dbName);

  if (!uri) {
    throw new Error(
      'MONGO_URL is not set. On Vercel this must be a reachable cloud connection string ' +
      '(e.g. a MongoDB Atlas mongodb+srv:// URI) configured in Project Settings → Environment ' +
      'Variables — a localhost URI (used for local/Emergent dev) will never work from a ' +
      'serverless deployment.'
    );
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(uri, {
      // Fail fast instead of hanging on the driver's default ~30s selection
      // timeout when the URI is unreachable (wrong host, IP not allow-listed
      // in Atlas, etc.) — surfaces the real error quickly in logs.
      serverSelectionTimeoutMS: 8000,
    })
      .then((c) => { cached.client = c; return c; })
      .catch((err) => {
        // Don't leave a rejected promise cached — let the next request retry
        // (e.g. after the user fixes the env var or Atlas network access).
        cached.promise = null;
        throw err;
      });
  }
  const client = await cached.promise;
  return client.db(dbName);
}
