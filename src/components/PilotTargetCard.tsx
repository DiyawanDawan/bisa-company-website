'use client';

import React from 'react';
import {
  Leaf,
  Banknote,
  Cloud,
  Briefcase,
  ArrowLeftRight,
  Sprout,
  type LucideIcon,
} from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import type { PilotTarget, PilotTargetIcon } from '@/data/impactContent';

const iconMap: Record<PilotTargetIcon, LucideIcon> = {
  biomass: Leaf,
  transaction: Banknote,
  carbon: Cloud,
  jobs: Briefcase,
  b2b: ArrowLeftRight,
  farmers: Sprout,
};

export default function PilotTargetCard({ target }: { target: PilotTarget }) {
  const Icon = iconMap[target.icon];

  return (
    <div className="flex gap-3.5 p-5 sm:p-6">
      <Icon
        className="mt-1 h-5 w-5 shrink-0 text-elevarm-cobalt"
        strokeWidth={2}
        aria-hidden
      />
      <div className="min-w-0 space-y-1.5">
        <p className="text-2xl sm:text-[1.65rem] font-bold font-display text-elevarm-cobalt leading-none tabular-nums">
          <AnimatedCounter {...target.counter} />
        </p>
        <p className="text-sm font-semibold text-elevarm-black leading-snug">{target.label}</p>
        <p className="text-xs sm:text-sm text-elevarm-grey leading-relaxed">{target.detail}</p>
      </div>
    </div>
  );
}
