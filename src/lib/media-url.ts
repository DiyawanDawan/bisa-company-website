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

/** DB path → https://loremflickr.com/{w}/{h}/{keywords}?lock=n */
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

  const keywordPath = keywordParts.join('/');
  const url = new URL(`https://loremflickr.com/${width}/${height}/${keywordPath}`);

  if (segments[i] === 'lock' && segments[i + 1]) {
    url.searchParams.set('lock', segments[i + 1]);
    i += 2;
  }
  if (segments[i] === 'random' && segments[i + 1]) {
    url.searchParams.set('random', segments[i + 1]);
  }

  return url.toString();
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
