import type { Transition, Variants } from 'framer-motion';

export const MOTION_EASE: Transition['ease'] = [0.25, 0.1, 0.25, 1];

export const MOTION_VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -40px 0px' as const };

export const MOTION_DURATION = {
  fast: 0.35,
  normal: 0.5,
  slow: 0.65,
} as const;

export type MotionVariantName = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'fadeLeft' | 'fadeRight';

export const MOTION_VARIANTS: Record<MotionVariantName, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: MOTION_DURATION.normal, ease: MOTION_EASE },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: MOTION_DURATION.normal, ease: MOTION_EASE },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: MOTION_DURATION.normal, ease: MOTION_EASE },
    },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: MOTION_DURATION.normal, ease: MOTION_EASE },
    },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: MOTION_DURATION.normal, ease: MOTION_EASE },
    },
  },
};

export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
