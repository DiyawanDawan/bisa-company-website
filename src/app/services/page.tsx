'use client';

import React from 'react';
import ServiceSection from '@/components/ServiceSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { servicesContent } from '@/data/servicesContent';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero — dark navy */}
      <section className="bg-gradient-to-br from-[#135122] via-[#1a4823] to-[#0f3d1a] text-white pt-header pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <ServiceSection key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}
