'use client';

type ForumSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
};

/** Search field with stronger border/placeholder contrast for light pages. */
export default function ForumSearchInput({
  value,
  onChange,
  placeholder,
  className = 'w-full sm:w-72',
}: ForumSearchInputProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <span
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        aria-hidden
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M20 20l-3.5-3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-base font-medium text-elevarm-black shadow-sm placeholder:text-slate-500 focus:border-elevarm-cobalt focus:bg-white focus:outline-none focus:ring-2 focus:ring-elevarm-cobalt/25 transition-colors"
      />
    </div>
  );
}
