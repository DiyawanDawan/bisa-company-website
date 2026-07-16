'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { CounterConfig } from '@/data/impactContent';

export type { CounterConfig };

function formatCounterValue(value: number, decimals: number): string {
  if (decimals > 0) {
    return value.toLocaleString('id-ID', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return Math.round(value).toLocaleString('id-ID');
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function AnimatedCounter({
  end,
  rangeEnd,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2200,
  className,
}: CounterConfig & { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayPrimary, setDisplayPrimary] = useState(0);
  const [displayRange, setDisplayRange] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOutCubic(progress);

      setDisplayPrimary(end * eased);

      if (rangeEnd != null) {
        setDisplayRange(rangeEnd * eased);
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [hasAnimated, end, rangeEnd, duration]);

  const primary = formatCounterValue(displayPrimary, decimals);
  const valueText =
    rangeEnd != null
      ? `${prefix}${primary}–${formatCounterValue(displayRange, decimals)}${suffix}`
      : `${prefix}${primary}${suffix}`;

  return (
    <span ref={ref} className={className} aria-label={valueText}>
      {valueText}
    </span>
  );
}
