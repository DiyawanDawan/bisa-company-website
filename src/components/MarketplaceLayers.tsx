'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wheat, Flame, BadgeCheck, ArrowRight, ArrowDown } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';
import { bisaAssets } from '@/data/bisaAssets';

const bgSlides = [
  { src: bisaAssets.banner.marketplace, position: 'center' },
  { src: bisaAssets.banner.biochar, position: 'center' },
  { src: bisaAssets.banner.organic, position: 'center 30%' },
];

const layersList = [
  {
    layer: 'Layer 1',
    Icon: Wheat,
    title: 'Limbah Biomassa',
    desc: 'Petani menjual sekam padi, tongkol jagung, dan tempurung kelapa ke pengepul atau industri — limbah yang biasanya dibakar kini jadi pendapatan tambahan.',
    highlight: 'Keuntungan 100% dari limbah yang semula dibuang',
  },
  {
    layer: 'Layer 2',
    Icon: Flame,
    title: 'Biochar Pupuk Organik',
    desc: 'Jual-beli biochar sebagai pupuk organik alternatif di saat pupuk bersubsidi tersalur kurang dari 10% — lengkap dengan grade kualitas A/B/C.',
    highlight: 'Peningkatan hasil panen hingga 6%',
  },
  {
    layer: 'Layer 3',
    Icon: BadgeCheck,
    title: 'Panen Organik Premium',
    desc: 'Hasil panen bebas kimia dengan sertifikasi BISA Organic dijual ke pasar premium — nilai jual lebih tinggi kembali ke petani.',
    highlight: 'Pasar premium bersertifikat BISA Organic',
  },
];

export default function MarketplaceLayers() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="marketplace-layers"
      className="scroll-mt-header relative w-full py-10 sm:py-16 overflow-hidden"
    >
      {/* Auto-carousel background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${bgSlides[current].src})`,
              backgroundPosition: bgSlides[current].position,
            }}
          />
        </AnimatePresence>
        {/* Overlay to keep content readable */}
        <div className="absolute inset-0 bg-elevarm-light-violet/85 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 md:gap-12">

        {/* Header */}
        <ScrollReveal className="max-w-[810px] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-elevarm-accent uppercase tracking-wider">
              Marketplace Tiga Layer
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-elevarm-black font-display tracking-tight leading-tight">
              Dari Limbah ke Panen Premium
            </h2>
          </div>
          <p className="text-elevarm-grey text-base leading-relaxed">
            BISA Marketplace hadir dalam tiga lapisan yang saling terhubung: limbah biomassa
            menjadi bahan baku biochar, biochar menyuburkan lahan, dan lahan sehat menghasilkan
            panen organik bernilai premium — satu siklus ekonomi sirkular yang utuh.
          </p>
        </ScrollReveal>

        {/* 3-Step Flow */}
        <StaggerReveal
          className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-6 w-full"
          stagger={0.12}
        >
          {layersList.map(({ layer, Icon, title, desc, highlight }, idx) => (
            <StaggerItem key={layer} className="relative flex">
              <div className="relative flex flex-col gap-4 rounded-2xl bg-white p-6 sm:p-7 shadow-[0_10px_30px_rgba(19,81,34,0.08)] w-full">
                {/* Layer badge + icon */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-elevarm-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-elevarm-accent">
                    {layer}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-elevarm-accent text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-elevarm-black font-display">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-elevarm-grey">{desc}</p>
                </div>

                <p className="mt-auto border-t border-elevarm-neutral-100 pt-3 text-xs font-semibold text-elevarm-accent">
                  {highlight}
                </p>
              </div>

              {/* Connector — arrow between cards */}
              {idx < layersList.length - 1 && (
                <>
                  <div
                    aria-hidden
                    className="hidden lg:flex absolute top-1/2 -right-6 z-10 h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-elevarm-accent text-white shadow-md"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div
                    aria-hidden
                    className="lg:hidden absolute -bottom-5 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-elevarm-accent text-white shadow-md"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </div>
                </>
              )}
            </StaggerItem>
          ))}
        </StaggerReveal>

      </div>
    </section>
  );
}
