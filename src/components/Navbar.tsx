'use client';

import { useEffect, useState } from 'react';
import { bisaBrand } from '@/data/bisaAssets';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigateHome, handleHashNavClick, normalizeHashId } from '@/lib/navigation';

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/#products' },
  { name: 'Forum', href: '/forum' },
  { name: 'Market', href: '/market' },
  { name: 'Impact', href: '/impact' },
  { name: 'GIS', href: '/gis/supply-demand' },
  { name: 'About Us', href: '/#about-us' },
  { name: 'Blog', href: '/blog' },
];

function getIsActive(href: string, pathname: string, hash: string) {
  if (href === '/#products') return pathname === '/' && hash === '#products';
  if (href === '/#about-us') return pathname === '/' && hash === '#about-us';
  if (href === '/blog') return pathname.startsWith('/blog');
  if (href === '/forum') return pathname.startsWith('/forum');
  if (href === '/market') return pathname.startsWith('/market');
  if (href === '/services') return pathname === '/services';
  if (href === '/impact') return pathname === '/impact';
  if (href === '/gis/supply-demand') return pathname.startsWith('/gis');
  return false;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hash, setHash] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleHashChange = () => {
      const id = normalizeHashId(window.location.hash.slice(1));
      setHash(id ? `#${id}` : '');
    };

    handleScroll();
    handleHashChange();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const darkHeroRoutes = ['/', '/services', '/blog', '/forum'];
  const hasDarkHero = darkHeroRoutes.includes(pathname);
  const isDarkNav = isScrolled || hasDarkHero;

  const getActive = (href: string) => getIsActive(href, pathname, hash);

  const linkClass = (active: boolean) =>
    `font-semibold transition-colors duration-200 text-sm whitespace-nowrap ${
      active
        ? isDarkNav
          ? 'text-elevarm-light-green'
          : 'text-elevarm-cobalt'
        : isDarkNav
          ? 'text-white hover:text-elevarm-light-green'
          : 'text-elevarm-black hover:text-elevarm-cobalt'
    }`;

  return (
    <nav
      id="navigation"
      className={`relative z-50 transition-all duration-300 ${
        isDarkNav
          ? isScrolled
            ? 'bg-[#135122] shadow-md'
            : 'bg-[#135122]/10 backdrop-blur-sm'
          : 'bg-white shadow-sm'
      } flex items-center w-full h-16 md:h-20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-6 lg:gap-10">
          <Link
            href="/"
            onClick={(e) => navigateHome(e, pathname)}
            className="flex shrink-0 items-center"
          >
            <img
              alt="BISA logo"
              src={
                isDarkNav
                  ? '/assets/img/logo/bisa-logo.png'
                  : '/assets/img/logo/bisa-logo-light.png'
              }
              className="h-9 w-auto md:h-11"
              loading="eager"
            />
          </Link>

          <div className="hidden lg:flex min-w-0 items-center gap-6 xl:gap-8 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleHashNavClick(e, link.href, pathname)}
                className={linkClass(getActive(link.href))}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:flex shrink-0 items-center gap-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-elevarm-black font-semibold text-sm hover:bg-elevarm-neutral transition-colors duration-200 shadow-sm"
            href={bisaBrand.adminDemoUrl}
          >
            Demo Admin
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-elevarm-black font-semibold text-sm hover:bg-elevarm-neutral transition-colors duration-200 shadow-sm"
            href={`mailto:${bisaBrand.email}`}
          >
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-4">
              <path d="M1.66666 3.83331L8.47076 8.59618C9.02173 8.98187 9.29722 9.17471 9.59688 9.2494C9.86157 9.31538 10.1384 9.31538 10.4031 9.2494C10.7028 9.17471 10.9782 8.98187 11.5292 8.59618L18.3333 3.83331M5.66666 14.6666H14.3333C15.7335 14.6666 16.4335 14.6666 16.9683 14.3942C17.4387 14.1545 17.8212 13.772 18.0608 13.3016C18.3333 12.7668 18.3333 12.0668 18.3333 10.6666V5.33331C18.3333 3.93318 18.3333 3.23312 18.0608 2.69834C17.8212 2.22793 17.4387 1.84548 16.9683 1.6058C16.4335 1.33331 15.7335 1.33331 14.3333 1.33331H5.66666C4.26653 1.33331 3.56646 1.33331 3.03168 1.6058C2.56128 1.84548 2.17882 2.22793 1.93914 2.69834C1.66666 3.23312 1.66666 3.93318 1.66666 5.33331V10.6666C1.66666 12.0668 1.66666 12.7668 1.93914 13.3016C2.17882 13.772 2.56128 14.1545 3.03168 14.3942C3.56646 14.6666 4.26653 14.6666 5.66666 14.6666Z" stroke="#101828" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Contact Us
          </a>
        </div>

        <div className="lg:hidden shrink-0">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
              isDarkNav
                ? 'text-white hover:text-elevarm-light-green'
                : 'text-elevarm-black hover:text-elevarm-cobalt'
            }`}
            aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={isDarkNav ? 'stroke-white' : 'stroke-elevarm-black'}>
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className={isDarkNav ? 'stroke-white' : 'stroke-elevarm-black'} width="20" height="14" viewBox="0 0 20 14" fill="none">
                <path d="M1 7H19M1 1H19M1 13H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } bg-[#135122] border-t border-[#1a4823]/50`}
      >
        <div className="max-h-[80vh] overflow-y-auto px-2 pt-2 pb-4 sm:px-3 bg-[#135122] flex flex-col shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => {
                handleHashNavClick(e, link.href, pathname);
                setIsMobileMenuOpen(false);
              }}
              className={`block px-4 py-3 border-b border-[#1a4823]/50 font-semibold transition-colors duration-200 ${
                getActive(link.href)
                  ? 'text-elevarm-light-green'
                  : 'text-white/95 hover:bg-elevarm-neutral/10'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 px-3 flex flex-col gap-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={bisaBrand.adminDemoUrl}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md text-base font-semibold text-elevarm-black bg-white hover:bg-elevarm-neutral transition-all duration-200"
            >
              Demo Admin
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:${bisaBrand.email}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md text-base font-semibold text-white bg-white/10 hover:bg-white/15 transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
