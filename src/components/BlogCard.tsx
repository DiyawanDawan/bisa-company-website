import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/data/blogContent';
import { getPostPath } from '@/lib/blogUtils';

function ArrowButton() {
  return (
    <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.16675 7.00002H12.8334M12.8334 7.00002L7.00008 1.16669M12.8334 7.00002L7.00008 12.8334" stroke="#283EBF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={getPostPath(post)} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-elevarm-neutral">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <ArrowButton />
      </div>
      <div className="space-y-2">
        <span className="text-sm font-semibold text-elevarm-cobalt">{post.category}</span>
        <h3 className="text-base sm:text-lg font-bold text-elevarm-black leading-snug group-hover:text-elevarm-cobalt transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-elevarm-grey leading-relaxed line-clamp-2">{post.excerpt}</p>
        <p className="text-xs text-elevarm-grey pt-1">{post.date}</p>
      </div>
    </Link>
  );
}
