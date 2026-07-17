'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export type Testimonial = {
  quote: string;
  author: string;
  region: string;
  image: string;
  imageFit?: 'cover' | 'contain';
};

const CARD_WIDTH_MOBILE = 260;
const CARD_WIDTH_DESKTOP = 340;
const GAP = 20;
/** Pixels per second — slow continuous drift. */
const SPEED = 26;

const BASE_CARD_CLASS =
  'testimonial-card shrink-0 rounded-2xl overflow-hidden flex flex-col bg-[#135122] shadow-md origin-center';

const CENTER_CARD_CLASS =
  'shadow-[0_28px_60px_rgba(19,81,34,0.32)] ring-2 ring-[#1A7A34]/30';

function applyCardStyle(card: HTMLElement, distancePx: number, cardWidth: number) {
  const maxDist = cardWidth * 1.35;
  const t = Math.min(1, Math.abs(distancePx) / maxDist);
  const scale = Math.max(0.78, 1.12 - t * 0.32);
  const opacity = Math.max(0.4, 1 - t * 0.55);
  const nearCenter = scale > 1.02;

  card.style.transform = `scale(${scale})`;
  card.style.opacity = String(opacity);
  card.style.zIndex = String(Math.round(scale * 100));
  card.className = nearCenter
    ? `${BASE_CARD_CLASS} ${CENTER_CARD_CLASS}`
    : BASE_CARD_CLASS;
}

export default function TestimonialMarquee({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_DESKTOP);

  const loop = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const updateWidth = () => {
      setCardWidth(window.innerWidth < 640 ? CARD_WIDTH_MOBILE : CARD_WIDTH_DESKTOP);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth, { passive: true });
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport || testimonials.length === 0) return;

    const segmentWidth = testimonials.length * (cardWidth + GAP);

    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min(64, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!pausedRef.current) {
        offsetRef.current += SPEED * dt;
        if (offsetRef.current >= segmentWidth) {
          offsetRef.current -= segmentWidth;
        }
      }

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

      const viewportRect = viewport.getBoundingClientRect();
      const centerX = viewportRect.left + viewportRect.width / 2;
      const cards = track.querySelectorAll<HTMLElement>('[data-testimonial-card]');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        applyCardStyle(card, cardCenter - centerX, cardWidth);
      });

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [testimonials.length, cardWidth]);

  if (testimonials.length === 0) return null;

  return (
    <div
      ref={viewportRef}
      className="relative overflow-hidden py-8 -mx-4 sm:mx-0"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={() => {
        pausedRef.current = false;
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16 bg-gradient-to-l from-white to-transparent" />

      <div
        ref={trackRef}
        className="flex w-max items-center gap-5 will-change-transform"
        style={{ transform: 'translate3d(0,0,0)' }}
      >
        {loop.map((item, idx) => {
          const fit = item.imageFit ?? 'cover';
          return (
            <article
              key={`${item.author}-${idx}`}
              data-testimonial-card
              className={BASE_CARD_CLASS}
              style={{ width: cardWidth }}
            >
              <div className="relative aspect-[4/3] w-full bg-[#0f3d1a]">
                <Image
                  src={item.image}
                  alt={`${item.author} — ${item.region}`}
                  fill
                  className={
                    fit === 'contain'
                      ? 'object-contain object-center p-3'
                      : 'object-cover object-center'
                  }
                  sizes={`${cardWidth}px`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#135122]/85 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-semibold text-white drop-shadow-sm">
                    {item.author}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-white/85">
                    {item.region}
                  </p>
                </div>
              </div>
              <div className="flex flex-grow flex-col gap-3 p-5">
                <p className="text-sm leading-relaxed text-elevarm-zinc line-clamp-5">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
