'use client';

import { bisaAssets } from '@/data/bisaAssets';
import { ScrollReveal } from '@/components/ScrollReveal';
import FloatingPhoneMockup from '@/components/FloatingPhoneMockup';
import PlayStoreBadge from '@/components/PlayStoreBadge';

type AppDownloadSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
};

const defaultScreenshots = [
  { src: bisaAssets.screenshots.marketplace, alt: 'Marketplace BISA di aplikasi mobile' },
  { src: bisaAssets.screenshots.forum, alt: 'Forum dan grup komunitas BISA' },
];

function DualFloatingPhones() {
  return (
    <div className="relative flex justify-center items-center min-h-[300px] sm:min-h-[380px] lg:min-h-[420px] [perspective:1600px]">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[10%] w-[72%] h-[75%] rounded-[40px] bg-white/10 blur-sm"
        style={{ transform: 'perspective(1600px) rotateY(-14deg) rotateX(6deg)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 w-[70%] max-w-md h-12 rounded-[100%] bg-black/25 blur-3xl"
      />

      <div className="relative z-10 flex items-end justify-center gap-3 sm:gap-5 lg:gap-8">
        <FloatingPhoneMockup
          src={defaultScreenshots[0].src}
          alt={defaultScreenshots[0].alt}
          widthClass="w-[140px] sm:w-[165px] lg:w-[190px]"
          tilt={{ rotateY: -24, rotateX: 12, rotateZ: -8 }}
          enableFloat
          floatDelay={0}
          showGroundShadow={false}
        />
        <FloatingPhoneMockup
          src={defaultScreenshots[1].src}
          alt={defaultScreenshots[1].alt}
          widthClass="w-[140px] sm:w-[165px] lg:w-[190px]"
          tilt={{ rotateY: -10, rotateX: 8, rotateZ: 4 }}
          enableFloat
          floatDelay={0.8}
          showGroundShadow={false}
        />
      </div>
    </div>
  );
}

export default function AppDownloadSection({
  id = 'download-app',
  title = 'Unduh Aplikasi BISA',
  description = 'Marketplace biomassa, forum edukasi, grup komunitas, negosiasi harga, dan IoT monitoring — semua dalam satu aplikasi untuk petani dan pembeli.',
  compact = false,
  className = '',
}: AppDownloadSectionProps) {
  if (compact) {
    return (
      <div
        id={id}
        className={`rounded-2xl bg-gradient-to-br from-[#f0fdf4] to-white overflow-hidden ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-5 sm:p-6">
          <div className="flex justify-center sm:justify-start order-2 sm:order-1">
            <FloatingPhoneMockup
              src={defaultScreenshots[1].src}
              alt={defaultScreenshots[1].alt}
              widthClass="w-[120px] sm:w-[140px]"
              tilt={{ rotateY: -16, rotateX: 10, rotateZ: -4 }}
              enableFloat
            />
          </div>
          <div className="flex-1 space-y-3 order-1 sm:order-2">
            <p className="text-xs font-bold uppercase tracking-wider text-elevarm-accent">Aplikasi Mobile</p>
            <h3 className="text-lg sm:text-xl font-bold text-elevarm-black font-display">{title}</h3>
            <p className="text-sm text-elevarm-grey leading-relaxed">{description}</p>
            <PlayStoreBadge />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id={id}
      className={`scroll-mt-header py-14 sm:py-20 bg-gradient-to-br from-[#135122] via-[#1a4823] to-[#0f3d1a] text-white overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[420px]">
          <ScrollReveal className="flex flex-col justify-center space-y-6 order-2 lg:order-1 lg:py-8">
            <div className="space-y-3">
              <span className="text-sm font-bold text-elevarm-light-green uppercase tracking-wider">
                Aplikasi Mobile BISA
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold font-display leading-tight">
                {title}
              </h2>
              <p className="text-elevarm-zinc text-base sm:text-lg leading-relaxed max-w-lg">
                {description}
              </p>
            </div>

            <ul className="space-y-3 text-sm sm:text-base text-white/90">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
                  ✓
                </span>
                Marketplace limbah, biochar, dan hasil organik
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
                  ✓
                </span>
                Forum edukasi &amp; grup komunitas seperti Discord
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
                  ✓
                </span>
                Posting, komentar, vote, dan notifikasi real-time
              </li>
            </ul>

            <PlayStoreBadge size="large" />
          </ScrollReveal>

          <ScrollReveal variant="fadeLeft" delay={0.1} className="order-1 lg:order-2 flex items-center justify-center">
            <DualFloatingPhones />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
