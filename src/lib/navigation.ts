import type { MouseEvent } from 'react';

export function getHeaderHeight(): number {
  if (typeof window === 'undefined') return 128;
  const value = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 128;
}

export function normalizeHashId(raw: string): string {
  if (!raw) return '';
  return raw.split('#')[0].trim();
}

export function buildHashUrl(id: string): string {
  const { pathname, search } = window.location;
  return `${pathname}${search}#${id}`;
}

export function scrollToSection(id: string) {
  const sectionId = normalizeHashId(id);
  if (!sectionId) return;

  const el = document.getElementById(sectionId);
  if (!el) return;

  const offset = getHeaderHeight();
  const top = el.getBoundingClientRect().top + window.scrollY - offset + 4;

  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

  const nextUrl = buildHashUrl(sectionId);
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (currentUrl !== nextUrl) {
    window.history.replaceState(null, '', nextUrl);
  }
  window.dispatchEvent(new Event('hashchange'));
}

export function navigateHome(e: MouseEvent<HTMLAnchorElement>, pathname: string) {
  if (pathname !== '/') return;

  e.preventDefault();
  window.history.replaceState(null, '', '/');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function handleHashNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string
) {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) return;

  const path = href.slice(0, hashIndex) || '/';
  const hash = normalizeHashId(href.slice(hashIndex + 1));
  if (!hash) return;

  if (pathname === path || (path === '/' && pathname === '/')) {
    e.preventDefault();
    scrollToSection(hash);
  }
}
