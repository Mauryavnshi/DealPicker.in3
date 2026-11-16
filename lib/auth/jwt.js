// JWT helpers for admin auth (Next.js App Router server-side).
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';

const JWT_EXPIRES_IN = '7d';

function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_JWT_SECRET must be configured with at least 32 characters.');
  }
  return secret;
}

function getAdminCredentials() {
  const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || '';
  if (!email || !password || password.length < 12) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (minimum 12 characters) in the server environment.');
  }
  return { email, password };
}
const LOCKOUT_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000;

export async function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain, hash) {
  try { return await bcrypt.compare(plain, hash); }
  catch { return false; }
}

export function signAdminToken({ email }) {
  return jwt.sign({ email, role: 'admin', type: 'access' }, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAdminToken(token) {
  try {
    const payload = jwt.verify(token, getJwtSecret());
    if (payload?.role !== 'admin') return null;
    return payload;
  } catch { return null; }
}

export function getBearerToken(req) {
  const auth = req.headers.get('authorization') || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7);
  // Fallback: cookie
  const cookie = req.headers.get('cookie') || '';
  const m = cookie.match(/dp_admin=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function requireAdmin(req) {
  const token = getBearerToken(req);
  if (!token) return null;
  return verifyAdminToken(token);
}

// Idempotent admin seed — rehashes if env password changed.
export async function seedAdmin() {
  const { email, password } = getAdminCredentials();
  const db = await getDb();
  const existing = await db.collection('admins').findOne({ email });
  if (!existing) {
    const hash = await hashPassword(password);
    await db.collection('admins').insertOne({
      email,
      passwordHash: hash,
      role: 'admin',
      createdAt: Date.now(),
    });
    return { seeded: true };
  }
  const stillValid = await verifyPassword(password, existing.passwordHash);
  if (!stillValid) {
    const hash = await hashPassword(password);
    await db.collection('admins').updateOne(
      { email },
      { $set: { passwordHash: hash, updatedAt: Date.now() } }
    );
    return { rehashed: true };
  }
  return { ok: true };
}

// Brute-force protection (per email+ip)
export async function checkLockout(identifier) {
  const db = await getDb();
  const rec = await db.collection('login_attempts').findOne({ identifier });
  if (!rec) return { locked: false };
  const now = Date.now();
  if (rec.count >= LOCKOUT_ATTEMPTS && (now - rec.lastAt) < LOCKOUT_WINDOW_MS) {
    return { locked: true, remainingMs: LOCKOUT_WINDOW_MS - (now - rec.lastAt) };
  }
  return { locked: false };
}

export async function recordFailedAttempt(identifier) {
  const db = await getDb();
  const now = Date.now();
  await db.collection('login_attempts').updateOne(
    { identifier },
    { $inc: { count: 1 }, $set: { lastAt: now } },
    { upsert: true },
  );
}

export async function clearAttempts(identifier) {
  const db = await getDb();
  await db.collection('login_attempts').deleteOne({ identifier });
}

export async function findAdminByEmail(email) {
  const db = await getDb();
  return db.collection('admins').findOne({ email });
}
