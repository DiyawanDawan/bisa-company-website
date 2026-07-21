'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { impactStats } from '@/data/impactContent';
import { ScrollReveal } from '@/components/ScrollReveal';

function ImpactCard({
  desc,
  category,
  image,
}: {
  desc: string;
  category: string;
  image: string;
}) {
  return (
    <article className="w-[260px] sm:w-[280px] lg:w-[300px] shrink-0 snap-start flex flex-col rounded-xl overflow-hidden bg-[#1a4823]">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image}
          alt={category}
          fill
          className="object-cover"
          sizes="300px"
        />
      </div>
      <div className="flex flex-col gap-3 p-4 sm:p-5 flex-grow">
        <p className="text-sm text-white/90 leading-relaxed flex-grow">{desc}</p>
        <span className="text-xs font-bold uppercase tracking-wider text-elevarm-accent leading-snug">
          {category}
        </span>
      </div>
    </article>
  );
}

export default function ImpactStats() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -320 : 320;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section id="impact" className="scroll-mt-header py-10 sm:py-16 bg-gradient-to-br from-[#135122] via-[#1a4823] to-[#0f3d1a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-10">
          <div className="max-w-2xl flex flex-col gap-4">
            <span className="text-sm font-bold text-elevarm-accent uppercase tracking-wider">
              Dampak & Keberlanjutan
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold font-display tracking-tight leading-tight">
              Target Dampak Pilot Lombok Tengah
            </h2>
            <p className="text-elevarm-zinc text-base leading-relaxed">
              BISA dirancang untuk dampak terukur: limbah terkelola, biochar berproduksi, karbon terserap, lapangan kerja tercipta, dan petani teredukasi — selaras program CSA-Biochar Bank Indonesia 2026.
            </p>
          </div>
          <div className="shrink-0 lg:pt-8">
            <Link
              href="/impact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-sm font-semibold rounded-full text-elevarm-black hover:bg-elevarm-neutral transition-all duration-200"
            >
              Learn More
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.16675 7.00002H12.8334M12.8334 7.00002L7.00008 1.16669M12.8334 7.00002L7.00008 12.8334" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="space-y-6">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {impactStats.map((stat, i) => (
              <ScrollReveal key={stat.category} delay={i * 0.08} className="shrink-0">
                <ImpactCard
                  desc={stat.desc}
                  category={stat.category}
                  image={stat.image}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Navigation arrows */}
          <ScrollReveal variant="fadeIn" delay={0.2} className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-elevarm-black hover:bg-elevarm-neutral transition-colors shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 8H2.66663M2.66663 8L7.33329 3.33333M2.66663 8L7.33329 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-elevarm-black hover:bg-elevarm-neutral transition-colors shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.66663 8H13.3333M13.3333 8L8.66663 3.33333M13.3333 8L8.66663 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
