'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MOTION_VARIANTS,
  MOTION_VIEWPORT,
  staggerContainer,
  getReducedMotion,
  type MotionVariantName,
} from '@/lib/motion';

function useMotionPrefs() {
  const [ready, setReady] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    setReduceMotion(getReducedMotion());
    setReady(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return { ready, reduceMotion };
}

type ScrollRevealProps = {
  children: React.ReactNode;
  variant?: MotionVariantName;
  delay?: number;
  className?: string;
};

export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  className,
}: ScrollRevealProps) {
  const { ready, reduceMotion } = useMotionPrefs();

  if (!ready || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={MOTION_VIEWPORT}
      variants={MOTION_VARIANTS[variant]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
};

export function StaggerReveal({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
}: StaggerRevealProps) {
  const { ready, reduceMotion } = useMotionPrefs();

  if (!ready || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={MOTION_VIEWPORT}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  variant?: MotionVariantName;
};

export function StaggerItem({
  children,
  className,
  variant = 'fadeUp',
}: StaggerItemProps) {
  const { ready, reduceMotion } = useMotionPrefs();

  if (!ready || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={MOTION_VARIANTS[variant]}>
      {children}
    </motion.div>
  );
}
