'use client';

import React from 'react';
import ServiceSection from '@/components/ServiceSection';
import MarketplaceLayers from '@/components/MarketplaceLayers';
import { ScrollReveal } from '@/components/ScrollReveal';
import { servicesContent } from '@/data/servicesContent';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative text-white pt-header pb-20 sm:pb-28 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/panag_laptop_disawah.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#135122]/92 via-[#1a4823]/88 to-[#0f3d1a]/92" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-3xl space-y-4">
            <span className="text-sm font-bold text-elevarm-accent uppercase tracking-wider">
              Platform BISA
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold font-display tracking-tight leading-tight">
              Dari limbah biomassa ke panen organik premium
            </h1>
            <p className="text-elevarm-zinc text-base sm:text-lg leading-relaxed">
              Empat pilar platform BISA — marketplace tiga layer, AI & IoT, GIS supply-demand, serta escrow dan forum edukasi — bekerja bersama menutup celah rantai nilai biomassa yang belum terintegrasi di Indonesia.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Service sections — alternating white / navy */}
      {servicesContent.map((service, index) => (
        <React.Fragment key={service.id}>
          <ServiceSection service={service} index={index} />
          {/* Marketplace tiga layer — reuse section setelah service marketplace */}
          {service.id === 'marketplace' && <MarketplaceLayers />}
        </React.Fragment>
      ))}
    </div>
  );
}
