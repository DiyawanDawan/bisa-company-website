import { getMediaBaseUrl } from '@/lib/siteConfig';

const STORAGE_PREFIXES = [
  'products/',
  'avatars/',
  'store-banners/',
  'general/',
  'forum/',
  'negotiations/',
  'articles/',
  'categories/',
];

function isStorageObjectPath(path: string): boolean {
  return STORAGE_PREFIXES.some((p) => path.startsWith(p));
}

function extractStorageKeyFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const assetsIdx = parsed.pathname.indexOf('/storage/assets/');
    if (assetsIdx !== -1) {
      return decodeURIComponent(
        parsed.pathname.slice(assetsIdx + '/storage/assets/'.length),
      );
    }
    const pathKey = decodeURIComponent(parsed.pathname.replace(/^\//, ''));
    return isStorageObjectPath(pathKey) ? pathKey : null;
  } catch {
    return null;
  }
}

export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path?.trim()) return null;
  const value = path.trim();
  if (value.startsWith('http://') || value.startsWith('https://')) {
    const key = extractStorageKeyFromUrl(value);
    if (key) return resolveMediaUrl(key);
    return value;
  }
  if (value.startsWith('external/')) return value;

  const base = getMediaBaseUrl();
  if (!base) return value;

  let normalized = value.replace(/^\//, '');
  if (normalized.startsWith('api/v1/storage/assets/')) {
    normalized = normalized.slice('api/v1/storage/assets/'.length);
  }
  return `${base}/${normalized}`;
}
