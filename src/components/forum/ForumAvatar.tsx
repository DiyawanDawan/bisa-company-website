'use client';

import { resolveMediaUrl } from '@/lib/media-url';
import { useState } from 'react';

function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || '?'
  );
}

type ForumAvatarProps = {
  name: string;
  url?: string | null;
  className?: string;
  textClassName?: string;
};

/** Avatar forum dengan resolve CDN/LoremFlickr + fallback inisial jika gagal load. */
export default function ForumAvatar({
  name,
  url,
  className = 'h-10 w-10 text-sm',
  textClassName = 'bg-elevarm-info-100 text-elevarm-cobalt',
}: ForumAvatarProps) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveMediaUrl(url);

  if (resolved && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={name}
        className={`shrink-0 rounded-full object-cover bg-elevarm-neutral ring-2 ring-white ${className}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ring-2 ring-white ${textClassName} ${className}`}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
