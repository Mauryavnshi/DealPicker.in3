// Utility helpers for API routes.
import { v4 as uuidv4 } from 'uuid';
import { slugify } from '@/lib/format';

export function sanitize(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return rest;
}

export function sanitizeMany(docs) {
  return (docs || []).map(sanitize);
}

export function toNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export function toBool(v, fallback = false) {
  if (v === true || v === 'true' || v === 1 || v === '1') return true;
  if (v === false || v === 'false' || v === 0 || v === '0') return false;
  return fallback;
}

export function normalizeBilingual(v, fallback = '') {
  if (v && typeof v === 'object' && ('en' in v || 'hi' in v)) {
    return { en: String(v.en ?? fallback), hi: String(v.hi ?? '') };
  }
  return { en: String(v ?? fallback), hi: '' };
}

export function normalizeStringArray(v) {
  if (Array.isArray(v)) return v.map(x => String(x)).filter(Boolean);
  if (typeof v === 'string') return v.split('\n').map(s => s.trim()).filter(Boolean);
  return [];
}

export function normalizeBilingualArray(v) {
  // Accepts {en:[], hi:[]} OR array (assumed EN)
  if (v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'hi' in v)) {
    return { en: normalizeStringArray(v.en), hi: normalizeStringArray(v.hi) };
  }
  return { en: normalizeStringArray(v), hi: [] };
}

export function normalizeBilingualSpecs(v) {
  const shape = (arr) => Array.isArray(arr)
    ? arr.filter(x => x && (x.key || x.k)).map(x => ({ key: String(x.key ?? x.k ?? ''), value: String(x.value ?? x.v ?? '') }))
    : [];
  if (v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'hi' in v)) {
    return { en: shape(v.en), hi: shape(v.hi) };
  }
  return { en: shape(v), hi: [] };
}

export function makeId() { return uuidv4(); }
export { slugify };
