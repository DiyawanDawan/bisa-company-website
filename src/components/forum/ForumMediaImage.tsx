'use client';

import { useState, type ReactNode } from 'react';
import { resolveMediaUrl } from '@/lib/media-url';

type ForumMediaImageProps = {
  url?: string | null;
  alt?: string;
  className?: string;
  /** Shown when URL missing or load fails (defaults to empty). */
  fallback?: ReactNode;
};

/** Forum media with CDN/LoremFlickr→Picsum resolve + graceful onError fallback. */
export default function ForumMediaImage({
  url,
  alt = '',
  className,
  fallback = null,
}: ForumMediaImageProps) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveMediaUrl(url);

  if (!resolved || failed) {
    return <>{fallback}</>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
