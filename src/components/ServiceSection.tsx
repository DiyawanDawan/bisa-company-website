'use client';

import React from 'react';
import Image from 'next/image';
import type { ServiceContent } from '@/data/servicesContent';
import { ScrollReveal } from '@/components/ScrollReveal';

type ServiceSectionProps = {
  service: ServiceContent;
  index: number;
};

function ServiceBullets({
  label,
  bullets,
  isDark,
}: {
  label: string;
  bullets: string[];
  isDark: boolean;
}) {
  return (
    <div>
      <p className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-elevarm-black'}`}>
        {label}
      </p>
      <ul className="space-y-2">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-sm bg-elevarm-accent" aria-hidden />
            <span className={isDark ? 'text-elevarm-zinc' : 'text-elevarm-grey'}>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LightGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="relative mt-8 sm:mt-10 w-full">
      <div
        className="pointer-events-none absolute -left-4 sm:-left-8 top-1/2 hidden h-40 w-20 -translate-y-1/2 rounded-[2rem] bg-elevarm-accent sm:block lg:h-48 lg:w-24"
        aria-hidden
      />
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {images.map((src, imgIdx) => (
          <div
            key={`${src}-${imgIdx}`}
            className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-xl bg-elevarm-neutral"
          >
            <Image
              src={src}
              alt={`${title} ${imgIdx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DarkGallery({ images, title }: { images: string[]; title: string }) {
  const [first, second, third] = images;

  return (
    <div className="mt-8 sm:mt-10 w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-5 md:h-[340px] lg:h-[400px] xl:h-[440px]">
        {[first, second].filter(Boolean).map((src, imgIdx) => (
          <div
            key={`${src}-${imgIdx}`}
            className={`relative overflow-hidden rounded-xl bg-[#135122]/40 aspect-[16/10] md:aspect-auto md:h-full md:max-h-none ${
              imgIdx === 1 ? 'md:row-start-2' : ''
            }`}
          >
            <Image
              src={src!}
              alt={`${title} ${imgIdx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
        {third && (
          <div className="relative overflow-hidden rounded-xl bg-[#135122]/40 aspect-[16/10] md:col-start-2 md:row-start-1 md:row-span-2 md:aspect-auto md:h-full md:max-h-none">
            <Image
              src={third}
              alt={`${title} 3`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ServiceSection({ service, index }: ServiceSectionProps) {
  const isDark = index % 2 === 1;
  const splitIndex = service.intro.length >= 3 ? 2 : 1;
  const leftParagraphs = service.intro.slice(0, splitIndex);
  const rightParagraphs = service.intro.slice(splitIndex);
  const galleryImages = service.images ?? (service.image ? [service.image] : []);

  return (
    <section
      id={service.id}
      className={`scroll-mt-header py-12 sm:py-16 ${
        isDark
          ? 'bg-gradient-to-br from-[#135122] via-[#1a4823] to-[#0f3d1a] text-white'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2
            className={`text-3xl sm:text-4xl md:text-[42px] font-bold font-display leading-tight mb-8 sm:mb-10 ${
              isDark ? 'text-white' : 'text-elevarm-black'
            }`}
          >
            {service.title}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ScrollReveal variant="fadeLeft" className="space-y-4 text-sm sm:text-base leading-relaxed">
            {leftParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className={isDark ? 'text-elevarm-zinc' : 'text-elevarm-grey'}
              >
                {paragraph}
              </p>
            ))}
          </ScrollReveal>

          <ScrollReveal variant="fadeRight" delay={0.1} className="space-y-4 text-sm sm:text-base leading-relaxed">
            {rightParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className={isDark ? 'text-elevarm-zinc' : 'text-elevarm-grey'}
              >
                {paragraph}
              </p>
            ))}

            <ServiceBullets
              label={service.bulletsLabel}
              bullets={service.bullets}
              isDark={isDark}
            />
          </ScrollReveal>
        </div>

        {galleryImages.length > 0 && (
          <ScrollReveal variant="fadeIn" delay={0.15}>
            {isDark ? (
              <DarkGallery images={galleryImages} title={service.title} />
            ) : (
              <LightGallery images={galleryImages} title={service.title} />
            )}
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
