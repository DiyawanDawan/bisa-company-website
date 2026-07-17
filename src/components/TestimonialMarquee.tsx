'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MOTION_EASE } from '@/lib/motion';

export type Testimonial = {
  quote: string;
  author: string;
  region: string;
  image: string;
  imageFit?: 'cover' | 'contain';
};

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function cardMotion(offset: number) {
  const abs = Math.abs(offset);
  if (abs === 0) {
    return { scale: 1.1, opacity: 1, y: 0, zIndex: 30 };
  }
  if (abs === 1) {
    return { scale: 0.86, opacity: 0.7, y: 20, zIndex: 20 };
  }
  return { scale: 0.72, opacity: 0.38, y: 36, zIndex: 10 };
}

/** Horizontal spacing by breakpoint (approx card width + gap). */
function useCardStep() {
  const [step, setStep] = useState(200);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) setStep(155);
      else if (width < 768) setStep(190);
      else setStep(220);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return step;
}

export default function TestimonialMarquee({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const count = testimonials.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = useCardStep();

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((current) => wrapIndex(current + dir, count));
    },
    [count],
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = window.setInterval(() => go(1), 4200);
    return () => window.clearInterval(id);
  }, [paused, count, go]);

  if (count === 0) return null;

  const visibleOffsets =
    count === 1 ? [0] : count === 2 ? [-1, 0] : [-2, -1, 0, 1, 2];

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative mx-auto flex h-[420px] sm:h-[460px] items-center justify-center overflow-x-clip overflow-y-visible px-2">
        {visibleOffsets.map((offset) => {
          const index = wrapIndex(active + offset, count);
          const item = testimonials[index];
          const fit = item.imageFit ?? 'cover';
          const motionStyle = cardMotion(offset);
          const isCenter = offset === 0;

          return (
            <motion.article
              key={`slot-${offset}`}
              layout={false}
              className={`absolute w-[250px] sm:w-[300px] md:w-[340px] rounded-2xl overflow-hidden flex flex-col bg-[#135122] will-change-transform ${
                isCenter
                  ? 'shadow-[0_28px_60px_rgba(19,81,34,0.35)] ring-2 ring-[#1A7A34]/35'
                  : 'shadow-md'
              }`}
              style={{ zIndex: motionStyle.zIndex }}
              initial={false}
              animate={{
                x: offset * step,
                scale: motionStyle.scale,
                opacity: motionStyle.opacity,
                y: motionStyle.y,
              }}
              transition={{ duration: 0.45, ease: MOTION_EASE }}
              role={isCenter ? 'group' : 'presentation'}
              aria-hidden={!isCenter}
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
                  sizes="340px"
                  priority={isCenter}
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
                <p
                  className={`leading-relaxed text-elevarm-zinc ${
                    isCenter
                      ? 'text-sm sm:text-[15px]'
                      : 'line-clamp-4 text-sm'
                  }`}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-elevarm-black shadow-sm transition hover:border-elevarm-accent hover:text-elevarm-accent"
          aria-label="Testimoni sebelumnya"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1.5">
          {testimonials.map((item, idx) => (
            <button
              key={item.author}
              type="button"
              onClick={() => setActive(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === active
                  ? 'w-6 bg-elevarm-accent'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Lihat testimoni ${item.author}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-elevarm-black shadow-sm transition hover:border-elevarm-accent hover:text-elevarm-accent"
          aria-label="Testimoni berikutnya"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
