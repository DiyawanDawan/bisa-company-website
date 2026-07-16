'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export type PhoneTilt = {
  rotateY?: number;
  rotateX?: number;
  rotateZ?: number;
};

type FloatingPhoneMockupProps = {
  src: string;
  alt: string;
  widthClass?: string;
  priority?: boolean;
  animateKey?: string;
  /** Rotasi tetap tanpa animasi mengambang */
  staticTilt?: boolean;
  /** Override sudut 3D */
  tilt?: PhoneTilt;
  /** Animasi mengambang (bisa dipakai bersama staticTilt) */
  enableFloat?: boolean;
  /** Delay animasi float (detik) */
  floatDelay?: number;
  /** Bayangan elips di bawah — matikan jika parent sudah punya */
  showGroundShadow?: boolean;
};

const defaultTilt: Required<PhoneTilt> = {
  rotateY: -18,
  rotateX: 10,
  rotateZ: -4,
};

export default function FloatingPhoneMockup({
  src,
  alt,
  widthClass = 'w-[200px] sm:w-[240px] lg:w-[280px]',
  priority = false,
  animateKey,
  staticTilt = false,
  tilt,
  enableFloat = false,
  floatDelay = 0,
  showGroundShadow = true,
}: FloatingPhoneMockupProps) {
  const rY = tilt?.rotateY ?? defaultTilt.rotateY;
  const rX = tilt?.rotateX ?? defaultTilt.rotateX;
  const rZ = tilt?.rotateZ ?? defaultTilt.rotateZ;

  const shouldFloat = enableFloat || !staticTilt;
  const wrapperClass = shouldFloat && !enableFloat
    ? 'relative flex justify-center items-center min-h-[320px] sm:min-h-[380px] [perspective:1400px]'
    : 'relative flex justify-center items-center [perspective:1400px]';

  const motionProps = shouldFloat
    ? {
        initial: { opacity: 0, y: 36, rotateY: rY - 4, rotateX: rX + 4, scale: 0.94 },
        animate: {
          opacity: 1,
          y: [0, -12, 0],
          rotateY: rY,
          rotateX: rX,
          rotateZ: rZ,
          scale: 1,
        },
        transition: {
          opacity: { duration: 0.35 },
          rotateY: { duration: 0.55, ease: 'easeOut' as const },
          rotateX: { duration: 0.55, ease: 'easeOut' as const },
          rotateZ: { duration: 0.55, ease: 'easeOut' as const },
          scale: { duration: 0.55, ease: 'easeOut' as const },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut' as const,
            delay: floatDelay,
          },
        },
      }
    : {
        initial: { opacity: 0, y: 16, rotateY: rY, rotateX: rX, rotateZ: rZ },
        animate: { opacity: 1, y: 0, rotateY: rY, rotateX: rX, rotateZ: rZ },
        transition: { duration: 0.45, ease: 'easeOut' as const },
      };

  return (
    <div className={wrapperClass}>
      {showGroundShadow && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[58%] h-10 rounded-[100%] bg-black/20 blur-2xl"
        />
      )}

      <motion.div
        key={animateKey ?? src}
        {...motionProps}
        exit={{ opacity: 0, y: 24, rotateY: 0, rotateX: 0, scale: 0.96 }}
        className={`relative z-20 ${widthClass} aspect-[9/19] [transform-style:preserve-3d] will-change-transform`}
        style={{
          transformPerspective: 1400,
          filter: 'drop-shadow(0 28px 48px rgba(0, 0, 0, 0.35))',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-center"
          sizes="(max-width: 1024px) 200px, 280px"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}
