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

const LOREM_FLICKR_PREFIX = 'external/loremflickr/';

function isStorageObjectPath(path: string): boolean {
  return STORAGE_PREFIXES.some((p) => path.startsWith(p));
}

/** Stable Picsum URL — LoremFlickr is unreliable (often 5xx / hotlink blocks). */
function picsumUrl(width: string, height: string, seed: string): string {
  const safeSeed = seed.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64) || 'bisa';
  return `https://picsum.photos/seed/${safeSeed}/${width}/${height}`;
}

/** DB path external/loremflickr/... → picsum (deterministic seed). */
function loremFlickrPathToUrl(dbPath: string): string {
  if (!dbPath.startsWith(LOREM_FLICKR_PREFIX)) return dbPath;

  const rest = dbPath.slice(LOREM_FLICKR_PREFIX.length);
  const segments = rest.split('/').filter(Boolean);
  if (segments.length < 3) return dbPath;

  const width = segments[0];
  const height = segments[1];
  const keywordParts: string[] = [];
  let i = 2;
  while (i < segments.length && segments[i] !== 'lock' && segments[i] !== 'random') {
    keywordParts.push(segments[i]);
    i += 1;
  }

  let lock = '0';
  let random = '';
  if (segments[i] === 'lock' && segments[i + 1]) {
    lock = segments[i + 1];
    i += 2;
  }
  if (segments[i] === 'random' && segments[i + 1]) {
    random = segments[i + 1];
  }

  const kw = keywordParts.join('-').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24);
  const seed = `bisa-lf-${lock}${random ? `-r${random}` : ''}${kw ? `-${kw}` : ''}`;
  return picsumUrl(width, height, seed);
}

/** Rewrite live https://loremflickr.com/... responses from older API deploys. */
function rewriteLoremFlickrHttpUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'loremflickr.com') return null;

    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;

    const width = parts[0];
    const height = parts[1];
    const keywords = parts.slice(2).join('-').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24);
    const lock = parsed.searchParams.get('lock') ?? '0';
    const random = parsed.searchParams.get('random');
    const seed = `bisa-lf-${lock}${random ? `-r${random}` : ''}${keywords ? `-${keywords}` : ''}`;
    return picsumUrl(width, height, seed);
  } catch {
    return null;
  }
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

  if (value.startsWith(LOREM_FLICKR_PREFIX)) {
    return loremFlickrPathToUrl(value);
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    const rewritten = rewriteLoremFlickrHttpUrl(value);
    if (rewritten) return rewritten;

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
