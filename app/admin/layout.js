'use client';

import { usePathname } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/lib/auth/AdminAuthContext';
import AdminShell from '@/components/admin/AdminShell';

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      <AdminGate>{children}</AdminGate>
    </AdminAuthProvider>
  );
}

function AdminGate({ children }) {
  const pathname = usePathname();
  const { admin, loading } = useAdminAuth();

  // /admin/login is public
  if (pathname === '/admin/login') return children;

  if (loading) {
    return (
      <div className="container mx-auto py-24 text-sm text-muted-foreground">Verifying session…</div>
    );
  }
  if (!admin) return null; // will redirect via context effect

  return <AdminShell>{children}</AdminShell>;
}
