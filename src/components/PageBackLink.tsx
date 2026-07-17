import Link from 'next/link';

type PageBackLinkProps = {
  href?: string;
  label?: string;
  className?: string;
};

/** Back link aligned with page gutters — extra top space under fixed header. */
export default function PageBackLink({
  href = '/',
  label = 'Back to Home',
  className = '',
}: PageBackLinkProps) {
  return (
    <div className={`pt-6 sm:pt-8 md:pt-10 ${className}`}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-lg px-1 py-1.5 text-sm font-semibold text-elevarm-cobalt transition-colors hover:bg-elevarm-cobalt/5 hover:underline"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="shrink-0"
        >
          <path
            d="M12.8334 7H1.16675M1.16675 7L6.33341 1.83333M1.16675 7L6.33341 12.1667"
            stroke="currentColor"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label}
      </Link>
    </div>
  );
}
