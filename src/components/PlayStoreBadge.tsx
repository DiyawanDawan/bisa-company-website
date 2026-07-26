import { Download } from 'lucide-react';
import { bisaBrand } from '@/data/bisaAssets';

type PlayStoreBadgeProps = {
  size?: 'default' | 'large';
  className?: string;
};

export default function PlayStoreBadge({ size = 'default', className = '' }: PlayStoreBadgeProps) {
  const large = size === 'large';

  return (
    <a
      href={bisaBrand.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Unduh aplikasi BISA (APK)"
      className={`inline-flex w-fit max-w-full shrink-0 items-center gap-3 rounded-xl bg-elevarm-accent px-4 py-2.5 border border-green-700/30 shadow-[0_8px_24px_rgba(19,81,34,0.35)] hover:bg-green-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${className}`}
    >
      <Download size={large ? 34 : 28} className="text-white" />
      <span className="text-left leading-tight pr-1">
        <span
          className={`block uppercase tracking-widest text-white/70 font-medium ${
            large ? 'text-[10px]' : 'text-[9px]'
          }`}
        >
          Unduh
        </span>
        <span className={`block font-bold text-white tracking-tight ${large ? 'text-xl' : 'text-lg'}`}>
          APK BISA
        </span>
      </span>
    </a>
  );
}
