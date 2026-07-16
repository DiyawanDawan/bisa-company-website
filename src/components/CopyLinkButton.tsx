'use client';

import React, { useState } from 'react';

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-elevarm-neutral-100 text-sm font-semibold text-elevarm-black hover:bg-elevarm-neutral transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.66667 6.66667V4.66667C6.66667 3.5621 7.5621 2.66667 8.66667 2.66667H11.3333C12.4379 2.66667 13.3333 3.5621 13.3333 4.66667V7.33333C13.3333 8.43791 12.4379 9.33333 11.3333 9.33333H9.33333M6.66667 6.66667H4.66667C3.5621 6.66667 2.66667 7.5621 2.66667 8.66667V11.3333C2.66667 12.4379 3.5621 13.3333 4.66667 13.3333H7.33333C8.43791 13.3333 9.33333 12.4379 9.33333 11.3333V9.33333M6.66667 6.66667H9.33333C10.4379 6.66667 11.3333 7.5621 11.3333 8.66667V11.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  );
}
