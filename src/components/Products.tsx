'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import FloatingPhoneMockup from '@/components/FloatingPhoneMockup';
import { bisaAssets, bisaBrand } from '@/data/bisaAssets';
import PlayStoreBadge from '@/components/PlayStoreBadge';

type ProductCta =
  | { type: 'coming-soon' }
  | { type: 'website'; href: string; label?: string }
  | { type: 'play-store'; href: string };

const productsList: {
  title: string;
  desc: string;
  image: string;
  cta: ProductCta;
}[] = [
  {
    title: 'Marketplace B2B',
    desc: 'Tiga lapisan dalam satu aplikasi: jual-beli limbah biomassa, biochar, dan hasil panen organik bersertifikat — dengan negosiasi harga dan pesanan langsung.',
    image: bisaAssets.screenshots.marketplace,
    cta: { type: 'play-store', href: '#' },
  },
  {
    title: 'AI Prediksi Biochar',
    desc: 'Prediksi grade A/B dari jenis biomassa, suhu, dan waktu pembakaran — tanpa uji lab. Rekomendasi dosis pemupukan berbasis dataset lokal BI, BRIN, dan IPB.',
    image: bisaAssets.screenshots.main,
    cta: { type: 'coming-soon' },
  },
  {
    title: 'GIS Supply–Demand',
    desc: 'Peta interaktif memetakan sebaran limbah dan lokasi pembeli terdekat — matchmaking supply-demand antarwilayah mengurangi biaya transportasi.',
    image: bisaAssets.screenshots.marketplacePng,
    cta: { type: 'website', href: '/gis/supply-demand', label: 'Lihat Dashboard GIS' },
  },
  {
    title: 'IoT Pro & Forum Edukasi',
    desc: 'Monitoring suhu tungku real-time (sensor atau foto termometer). Forum terkurati dan asisten virtual LLM+RAG untuk belajar produksi biochar mandiri.',
    image: bisaAssets.screenshots.forum,
    cta: { type: 'website', href: '/forum', label: 'Lihat Forum & Grup' },
  },
  {
    title: 'Admin Portal',
    desc: 'Panel operasional BISA untuk moderasi pengguna, transaksi, sengketa, dan Customer Service — cocok untuk demo tim internal.',
    image: bisaAssets.screenshots.main,
    cta: {
      type: 'website',
      href: bisaBrand.adminDemoUrl,
      label: 'Coba Demo Admin',
    },
  },
];

function ProductCtaButton({ cta }: { cta: ProductCta }) {
  if (cta.type === 'coming-soon') {
    return (
      <span
        aria-disabled="true"
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-elevarm-grey cursor-not-allowed"
      >
        <Globe className="h-4 w-4 shrink-0" />
        Segera Hadir
      </span>
    );
  }

  if (cta.type === 'website') {
    return (
      <a
        href={cta.href}
        target={cta.href.startsWith('http') ? '_blank' : undefined}
        rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-elevarm-black hover:border-slate-400 transition-colors"
      >
        <Globe className="h-4 w-4 shrink-0" />
        {cta.label ?? 'Visit Website'}
      </a>
    );
  }

  return <PlayStoreBadge />;
}

export default function Products() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = productsList[activeIndex];

  return (
    <section id="products" className="scroll-mt-header w-full bg-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 md:gap-14">

        {/* Header */}
        <ScrollReveal className="max-w-[810px] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-elevarm-accent uppercase tracking-wider">
              Fitur Platform
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-elevarm-black font-display tracking-tight leading-tight">
              Satu Aplikasi, Rantai Nilai Lengkap
            </h2>
          </div>
          <p className="text-elevarm-grey text-base leading-relaxed">
            BISA menggabungkan marketplace tiga layer, AI prediksi grade biochar, GIS matchmaking, escrow transaksi, IoT monitoring, dan forum edukasi — semua dalam aplikasi mobile berbasis peran untuk petani dan pembeli.
          </p>
        </ScrollReveal>

        {/* Two-column: tabs + visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollReveal variant="fadeLeft">

          {/* Left — vertical tab list */}
          <div className="relative border-l border-elevarm-neutral-100 pl-6 sm:pl-8 w-full">
            {productsList.map((product, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={product.title}
                  className="relative w-full text-left py-5 first:pt-0 last:pb-0"
                >
                  {isActive && (
                    <motion.span
                      layoutId="product-active-indicator"
                      className="absolute -left-6 sm:-left-8 top-0 bottom-0 w-1 bg-elevarm-cobalt rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="w-full text-left group"
                    aria-expanded={isActive}
                    aria-controls={`product-panel-${idx}`}
                  >
                    <div className="flex flex-col gap-2">
                      <h3
                        className={`text-lg font-semibold font-display transition-colors ${
                          isActive ? 'text-elevarm-black' : 'text-elevarm-black/80 group-hover:text-elevarm-black'
                        }`}
                      >
                        {product.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed text-elevarm-grey transition-all ${
                          isActive ? '' : 'line-clamp-1'
                        }`}
                      >
                        {product.desc}
                      </p>
                    </div>
                  </button>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="pt-2"
                    >
                      <ProductCtaButton cta={product.cta} />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
          </ScrollReveal>

          {/* Right — green pill + floating phone mockup */}
          <ScrollReveal variant="fadeRight" className="relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] [perspective:1200px]">
            <div
              aria-hidden
              className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-[52%] sm:w-[48%] h-[88%] bg-elevarm-accent rounded-[32px] sm:rounded-[40px] shadow-[0_24px_60px_rgba(19,81,34,0.22)]"
              style={{ transform: 'perspective(1200px) rotateY(12deg) rotateX(4deg) translateZ(-40px)' }}
            />

            <div className="relative z-10 w-full px-4 sm:px-0">
              <FloatingPhoneMockup
                key={activeProduct.title}
                src={activeProduct.image}
                alt={`Screenshot aplikasi BISA — ${activeProduct.title}`}
                animateKey={activeProduct.title}
                priority={activeIndex === 0}
                tilt={{ rotateY: 18, rotateX: 8, rotateZ: 4 }}
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile tab labels */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 lg:hidden border-t border-elevarm-neutral-100 pt-6">
          {productsList.map((product, idx) => (
            <button
              key={product.title}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`text-xs sm:text-sm font-semibold transition-colors ${
                activeIndex === idx
                  ? 'text-elevarm-cobalt'
                  : 'text-elevarm-grey hover:text-elevarm-black'
              }`}
            >
              {product.title}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
