'use client';

import React from 'react';
import Image from 'next/image';

export type Testimonial = {
  quote: string;
  author: string;
  region: string;
  image: string;
  imageFit?: 'cover' | 'contain';
};

export default function TestimonialMarquee({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const doubled = [...testimonials, ...testimonials];

  return (
    <div className="overflow-hidden -mx-4 sm:mx-0">
      <div className="flex w-max gap-5 animate-marquee-left py-2">
        {doubled.map((t, idx) => {
          const fit = t.imageFit ?? 'cover';
          return (
            <article
              key={`${t.author}-${idx}`}
              className="w-[300px] sm:w-[360px] shrink-0 rounded-2xl overflow-hidden shadow-md flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full bg-[#135122]">
                <Image
                  src={t.image}
                  alt={`${t.author} — ${t.region}`}
                  fill
                  className={
                    fit === 'contain'
                      ? 'object-contain object-center p-3'
                      : 'object-cover object-center'
                  }
                  sizes="360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#135122]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-semibold text-white text-sm drop-shadow-sm">{t.author}</p>
                  <p className="text-xs text-white/85 uppercase tracking-wider mt-0.5">
                    {t.region}
                  </p>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-grow bg-[#135122]">
                <p className="text-sm leading-relaxed text-elevarm-zinc flex-grow">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
