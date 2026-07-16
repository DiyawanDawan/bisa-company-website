import Link from 'next/link';

export default function PageBackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-elevarm-cobalt hover:underline"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
        <path d="M12.8334 7H1.16675M1.16675 7L6.33341 1.83333M1.16675 7L6.33341 12.1667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back to Home
    </Link>
  );
}
