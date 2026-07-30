'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const AdminAuthContext = createContext(null);
const TOKEN_KEY = 'dp_admin_token';

export function AdminAuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const check = useCallback(async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    if (!token) { setAdmin(null); setLoading(false); return null; }
    try {
      const r = await fetch('/api/auth/admin/me', { headers: { Authorization: `Bearer ${token}` } });
      if (!r.ok) throw new Error('unauth');
      const d = await r.json();
      setAdmin(d);
      setLoading(false);
      return d;
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setAdmin(null); setLoading(false); return null;
    }
  }, []);

  useEffect(() => { check(); }, [check]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    document.cookie = 'dp_admin=; path=/; max-age=0; samesite=lax';
    setAdmin(null);
    router.replace('/admin/login');
  }, [router]);

  const token = () => (typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null);

  // Auth guard: redirect non-admin users away from /admin/*  (except /admin/login)
  useEffect(() => {
    if (loading) return;
    if (!pathname?.startsWith('/admin')) return;
    if (pathname === '/admin/login') return;
    if (!admin) router.replace('/admin/login');
  }, [pathname, admin, loading, router]);

  return (
    <AdminAuthContext.Provider value={{ admin, loading, logout, refresh: check, token }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}

// Helper for authenticated fetch inside admin UI.
export async function adminFetch(url, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = new Headers(options.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  const r = await fetch(url, { ...options, headers });
  if (r.status === 401) {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/admin/login';
    return r;
  }
  return r;
}
