'use client';

import React from 'react';
import Image from 'next/image';
import PageBackLink from '@/components/PageBackLink';
import TestimonialMarquee from '@/components/TestimonialMarquee';
import AnimatedCounter from '@/components/AnimatedCounter';
import PilotTargetCard from '@/components/PilotTargetCard';
import {
  impactHeroCopy,
  impactHeroVisual,
  impactPillars,
  farmerTestimonials,
  pilotYearOneTargets,
} from '@/data/impactContent';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';

export default function ImpactPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-white pt-header pb-14 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageBackLink />

          <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
            <ScrollReveal className="lg:col-span-5 xl:col-span-5 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-elevarm-accent uppercase tracking-wider">
                  {impactHeroCopy.eyebrow}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-elevarm-accent/10 text-elevarm-accent uppercase">
                  {impactHeroCopy.badge}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-elevarm-black font-display tracking-tight leading-tight">
                {impactHeroCopy.title}
              </h1>
              <p className="text-elevarm-grey text-base sm:text-lg leading-relaxed">
                {impactHeroCopy.intro}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" className="lg:col-span-7 xl:col-span-7">
              <div className="relative rounded-2xl overflow-hidden bg-elevarm-neutral min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]">
                <Image
                  src={impactHeroVisual.image}
                  alt={impactHeroVisual.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#135122]/90 via-[#135122]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 space-y-4">
                  <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                    {impactHeroVisual.caption}
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {impactHeroVisual.surveyStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl bg-white/10 backdrop-blur-sm px-2 py-3 sm:px-3 sm:py-4 text-center"
                      >
                        <p className="text-xl sm:text-2xl font-bold font-display text-white leading-none">
                          <AnimatedCounter {...stat.counter} duration={1800} />
                        </p>
                        <p className="text-[10px] sm:text-xs text-white/85 mt-1.5 leading-snug">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-[#f0fdf4] py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="space-y-2 max-w-3xl">
            <p className="text-base sm:text-lg font-semibold text-elevarm-black">
              {impactHeroCopy.pilotHeading}
            </p>
            <p className="text-sm text-elevarm-grey leading-relaxed">
              {impactHeroCopy.pilotSubtext}
            </p>
          </ScrollReveal>

          {/* Sibling of ScrollReveal — nested whileInView kept cards stuck at opacity 0 */}
          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#135122]/12 rounded-xl overflow-hidden shadow-sm"
            stagger={0.06}
          >
            {pilotYearOneTargets.map((target) => (
              <StaggerItem key={target.label} className="min-w-0 bg-white">
                <PilotTargetCard target={target} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-elevarm-black font-display">
              Pilar Dampak BISA
            </h2>
            <p className="text-elevarm-grey text-sm sm:text-base leading-relaxed">
              Setiap fitur platform dirancang untuk menjawab masalah nyata petani NTB: limbah dibakar, pupuk langka, tanah asam, dan akses pasar premium terbatas.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
            {impactPillars.map((pillar) => (
              <StaggerItem
                key={pillar.title}
                className="bg-white rounded-2xl overflow-hidden
                  shadow-[0_12px_28px_-6px_rgba(19,81,34,0.26),0_6px_14px_-4px_rgba(0,0,0,0.1)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-elevarm-neutral">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-semibold text-elevarm-black">{pillar.title}</h3>
                  <p className="text-sm text-elevarm-grey leading-relaxed">{pillar.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="bg-[#f1f5f9] py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="scaleIn" className="max-w-4xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-elevarm-black font-display">
              Pengukuran Keberhasilan
            </h2>
            <p className="text-elevarm-grey text-sm sm:text-base leading-relaxed">
              Indikator pilot diukur dari data transaksi escrow, verifikasi lapangan penyuluh mitra, sampling biochar, pre/post-test edukasi (target 70%), NPS setiap 3 bulan (target &gt;80%), dan akurasi prediksi AI (MAPE &lt;10%). Data emisi menggunakan metodologi GWP BI-UNDIP dan LCA BRIN 2023.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="space-y-2 max-w-3xl">
            <span className="text-sm font-bold text-elevarm-accent uppercase tracking-wider">
              Testimoni
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-elevarm-black font-display">
              Suara Petani & Mitra NTB
            </h2>
            <p className="text-elevarm-grey text-sm sm:text-base leading-relaxed">
              Berdasarkan survei awal 16 petani Lombok Tengah & Timur — 94% tertarik jual limbah, 87% tertarik beli biochar, dan 87% ingin pasarkan hasil panen organik via platform.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" delay={0.15}>
            <TestimonialMarquee testimonials={farmerTestimonials} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
