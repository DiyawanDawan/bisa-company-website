import { bisaBrand } from '@/data/bisaAssets';

function GooglePlayIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M1.9 2.1c-.6.3-1 .9-1 1.6v16.6c0 .7.4 1.3 1 1.6l10.7-10.7L1.9 2.1z"
        fill="#4285F4"
      />
      <path
        d="M12.6 12 1.9 22.7c.6.3 1.3.3 1.9 0L16.8 15 12.6 12z"
        fill="#34A853"
      />
      <path
        d="M22.2 10.6 16.8 7.4 12.6 12l4.2 4.2 5.4-3.1c.8-.5.8-1.5 0-2z"
        fill="#FBBC04"
      />
      <path
        d="M1.9 2.1 12.6 12l4.2-4.2L3.8.5C3.2.2 2.5.3 1.9 2.1z"
        fill="#EA4335"
      />
    </svg>
  );
}

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
      aria-label="Unduh aplikasi BISA di Google Play"
      className={`inline-flex w-fit max-w-full shrink-0 items-center gap-3 rounded-xl bg-[#0d0d0d] px-4 py-2.5 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${className}`}
    >
      <GooglePlayIcon size={large ? 34 : 28} />
      <span className="text-left leading-tight pr-1">
        <span
          className={`block uppercase tracking-widest text-white/70 font-medium ${
            large ? 'text-[10px]' : 'text-[9px]'
          }`}
        >
          Unduh di
        </span>
        <span className={`block font-bold text-white tracking-tight ${large ? 'text-xl' : 'text-lg'}`}>
          Google Play
        </span>
      </span>
    </a>
  );
}
