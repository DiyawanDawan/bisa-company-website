'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navigateHome, handleHashNavClick } from '@/lib/navigation';
import { bisaBrand, bisaSocialLinks } from '@/data/bisaAssets';

function SocialIcon({ name }: { name: (typeof bisaSocialLinks)[number]['name'] }) {
  const className = 'w-4 h-4';
  switch (name) {
    case 'Instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.12 1.12 0 0 1 1.12 1.12 1.12 1.12 0 0 1-1.12 1.12 1.12 1.12 0 0 1-1.12-1.12 1.12 1.12 0 0 1 1.12-1.12M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        </svg>
      );
    case 'YouTube':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C17.8 5 12 5 12 5s-5.8 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c2 .4 7.8.4 7.8.4s5.8 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  const pathname = usePathname();

  const quickLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/#products' },
    { name: 'Forum', href: '/forum' },
    { name: 'Market Intelligence', href: '/market' },
    { name: 'Impact', href: '/impact' },
    { name: 'GIS Supply Demand', href: '/gis/supply-demand' },
    { name: 'About Us', href: '/#about-us' },
    { name: 'Blog', href: '/blog' },
  ];

  const legalLinks = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Term and Conditions', href: '/term-conditions' },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#135122] via-[#1a4823] to-[#0f3d1a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/10">

          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                onClick={(e) => navigateHome(e, pathname)}
                className="inline-block mb-4"
              >
                <Image
                  src="/assets/img/logo/bisa-logo.png"
                  alt="BISA logo"
                  width={140}
                  height={44}
                  className="h-9 w-auto md:h-11"
                />
              </Link>
              <h3 className="text-base font-semibold text-white mb-1">{bisaBrand.fullName}</h3>
              <p className="text-elevarm-zinc text-sm leading-relaxed max-w-sm mb-3">
                {bisaBrand.tagline}
              </p>
              <p className="text-elevarm-zinc text-sm leading-relaxed max-w-sm">
                {bisaBrand.location}
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-elevarm-light-green uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleHashNavClick(e, link.href, pathname)}
                    className="text-elevarm-zinc hover:text-white text-sm font-medium transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-elevarm-light-green uppercase tracking-wider mb-4">
                Hubungi BISA
              </h4>
              <a
                href={`mailto:${bisaBrand.email}`}
                className="text-white font-semibold hover:text-elevarm-light-green transition-colors duration-200"
              >
                {bisaBrand.email}
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold text-elevarm-light-green uppercase tracking-wider mb-3">
                Media Sosial
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {bisaSocialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.name}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-elevarm-zinc hover:bg-white/20 hover:text-white transition-colors duration-200"
                  >
                    <SocialIcon name={social.name} />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-elevarm-zinc">
          <p className="mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} {bisaBrand.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
