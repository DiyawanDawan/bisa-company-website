const PRODUCTION_BACKEND = 'https://backend-dev-v1.bisaagri.com';
const PRODUCTION_CDN = 'https://cdn.bisaagri.com';

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

/** Server-side backend base (no /api/v1 suffix). Used by Next.js rewrites. */
export function getBackendUrl(): string {
  const fromEnv = process.env.BACKEND_URL?.trim();
  if (fromEnv) {
    return stripTrailingSlash(fromEnv).replace(/\/api\/v1$/i, '');
  }
  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_BACKEND;
  }
  return 'http://localhost:3000';
}

/** Client-visible CDN base for R2 media paths from API. */
export function getMediaBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim();
  if (fromEnv) {
    return stripTrailingSlash(fromEnv).replace(/\/api\/v1$/i, '');
  }
  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_CDN;
  }
  return PRODUCTION_CDN;
}

export const isDev = process.env.NODE_ENV !== 'production';
