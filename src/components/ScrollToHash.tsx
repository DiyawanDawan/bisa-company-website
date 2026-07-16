'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToSection, normalizeHashId } from '@/lib/navigation';

export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = normalizeHashId(window.location.hash.slice(1));
    if (!hash) return;

    const timer = window.setTimeout(() => {
      scrollToSection(hash);
    }, 100);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
