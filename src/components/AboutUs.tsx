'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';
import { bisaAssets, bisaBrand } from '@/data/bisaAssets';

const highlights = [
  {
    title: 'Marketplace B2B',
    desc: 'Jual-beli limbah biomassa, biochar, dan hasil panen organik dalam satu aplikasi.',
    image: bisaAssets.app.marketplace,
  },
  {
    title: 'AI & IoT Pro',
    desc: 'Prediksi grade biochar gratis, plus monitoring suhu tungku real-time lewat langganan IoT Pro.',
    image: bisaAssets.app.impact,
  },
  {
    title: 'Pilot Lombok Tengah',
    desc: 'Dibangun bersama petani, penyuluh PPL, dan mitra industri biochar NTB.',
    image: bisaAssets.banner.marketplace,
  },
];

const teamStats = [
  { value: '10–20', label: 'Petani Binaan Pilot Lombok, Nusa Tenggara Barat' },
  { value: '3', label: 'Lapisan Marketplace — Limbah, Biochar, Panen Organik' },
  { value: '94%', label: 'Petani Survei Tertarik Platform BISA' },
];

const teamMembers = [
  {
    name: 'DIAYAWAN',
    role: 'Founder & CEO',
    image: '/images/team.png',
    bio: 'Memimpin BISA dengan visi ekonomi sirkular untuk pertanian Indonesia — menghubungkan petani, industri, dan pasar premium dalam satu ekosistem digital.',
  },
];

export default function AboutUs() {
  return (
    <section id="about-us" className="scroll-mt-header py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal className="max-w-[810px] flex flex-col gap-6 mb-8 md:mb-10">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-elevarm-cobalt uppercase tracking-wider">
              Tentang Kami
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-elevarm-black font-display tracking-tight leading-tight">
              {bisaBrand.fullName}
            </h2>
            <p className="text-sm font-semibold text-elevarm-cobalt uppercase tracking-wide">
              {bisaBrand.name} · {bisaBrand.tagline}
            </p>
          </div>
          <p className="text-elevarm-grey text-base leading-relaxed">
            BISA adalah platform mobile B2B ekonomi sirkular yang menghubungkan petani, pengepul, dan industri biochar.
            Dirancang dari pengalaman langsung di Lombok Tengah — mengatasi limbah biomassa yang dibakar, krisis pupuk,
            dan kebutuhan pasar organik premium — dengan marketplace tiga lapisan, AI prediksi biochar, GIS, escrow,
            dan forum edukasi dalam satu ekosistem.
          </p>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-14" stagger={0.08}>
          {highlights.map((item) => (
            <StaggerItem key={item.title} className="flex flex-col rounded-xl overflow-hidden bg-elevarm-neutral/30">
              <div className="relative aspect-[16/10] w-full bg-[#135122]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h3 className="text-base font-semibold text-elevarm-black">{item.title}</h3>
                <p className="text-sm text-elevarm-grey leading-relaxed">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <ScrollReveal variant="scaleIn" className="bg-elevarm-neutral rounded-2xl md:rounded-3xl px-6 py-8 sm:px-10 sm:py-10 md:py-12">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-center" stagger={0.12}>
            {teamStats.map((stat) => (
              <StaggerItem key={stat.label} variant="scaleIn" className="space-y-2">
                <h4 className="text-4xl sm:text-5xl font-bold font-display text-elevarm-cobalt">
                  {stat.value}
                </h4>
                <p className="text-sm sm:text-base text-elevarm-black font-medium leading-relaxed">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </ScrollReveal>

      </div>

      {/* Team */}
      <ScrollReveal className="pt-14 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-sm font-bold text-elevarm-cobalt uppercase tracking-wider">
              Tim Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-elevarm-black font-display tracking-tight mt-2">
              Di Balik BISA
            </h2>
          </div>

          <div className="flex justify-center">
            <StaggerReveal className="max-w-sm" stagger={0.1}>
              {teamMembers.map((member) => (
                <StaggerItem key={member.name} variant="scaleIn">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-64 h-80 sm:w-72 sm:h-88 md:w-80 md:h-96 rounded-3xl overflow-hidden shadow-xl relative mb-6">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="320px"
                      />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-elevarm-black font-display">{member.name}</h3>
                    <p className="text-sm font-semibold text-elevarm-cobalt mt-2">{member.role}</p>
                    <p className="text-sm text-elevarm-grey leading-relaxed mt-3 max-w-xs">{member.bio}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </ScrollReveal>

    </section>
  );
}
