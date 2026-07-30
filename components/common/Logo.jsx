'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Logo({ compact = false, className = '' }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const src = mounted && resolvedTheme === 'light' ? '/logo-light.png' : '/logo-dark.png';
  return (
    <Link href="/" aria-label="DealPicker home" className={`inline-flex items-center gap-2 ${className}`} data-testid="nav-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="DealPicker"
        width={compact ? 120 : 148}
        height={compact ? 28 : 36}
        className={`${compact ? 'h-7' : 'h-8 md:h-9'} w-auto select-none`}
        draggable={false}
      />
    </Link>
  );
}
