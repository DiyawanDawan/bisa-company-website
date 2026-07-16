'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import { getPostPath } from '@/lib/blogUtils';
import {
  blogPosts,
  blogCategories,
  POSTS_PER_PAGE,
  TOTAL_PAGES,
} from '@/data/blogContent';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>('All Posts');
  const [search, setSearch] = useState('');

  const featured = blogPosts.find((p) => p.featured)!;

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (post.featured) return false;
      const matchCategory = category === 'All Posts' || post.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white">

      {/* Featured hero — dark navy */}
      <section className="bg-gradient-to-br from-[#135122] via-[#1a4823] to-[#0f3d1a] text-white pt-header pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollReveal variant="fadeRight" className="space-y-5 order-2 lg:order-1">
              <span className="text-sm font-bold text-elevarm-accent uppercase tracking-wider">
                {featured.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display leading-tight">
                {featured.title}
              </h1>
              <p className="text-elevarm-zinc text-sm sm:text-base leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>
              <Link
                href={getPostPath(featured)}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-elevarm-black text-sm font-semibold rounded-full hover:bg-elevarm-neutral transition-colors"
              >
                Read More
              </Link>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" delay={0.1} className="order-1 lg:order-2">
            <Link
              href={getPostPath(featured)}
              className="relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-lg block group"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <p className="absolute bottom-4 left-4 text-xs text-white/90 font-medium">
                Published on {featured.date}
              </p>
            </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <ScrollReveal className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-elevarm-black font-display tracking-tight">
              Resources and Insights
            </h2>
            <p className="text-elevarm-grey text-base">
              The latest industry news, interviews, technologies, and resources.
            </p>
          </ScrollReveal>

          {/* Filter + search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-elevarm-neutral-100 pb-4">
            <nav className="flex flex-wrap gap-6">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                    setPage(1);
                  }}
                  className={`pb-3 text-sm font-semibold transition-colors border-b-2 -mb-[17px] ${
                    category === cat
                      ? 'text-elevarm-cobalt border-elevarm-cobalt'
                      : 'text-elevarm-grey border-transparent hover:text-elevarm-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            <div className="relative w-full sm:w-64 shrink-0">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-elevarm-grey"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 14L11.1 11.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="text"
                placeholder="Type to search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-9 pr-4 py-2.5 border border-elevarm-neutral-100 rounded-lg text-sm text-elevarm-black placeholder:text-elevarm-grey focus:outline-none focus:border-elevarm-cobalt transition-colors"
              />
            </div>
          </div>

          {/* Grid */}
          {pagePosts.length > 0 ? (
            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10" stagger={0.08}>
              {pagePosts.map((post) => (
                <StaggerItem key={post.id}>
                  <BlogCard post={post} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          ) : (
            <p className="text-center text-elevarm-grey py-12">No posts found matching your search.</p>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between pt-6 border-t border-elevarm-neutral-100">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-elevarm-neutral-100 text-sm font-semibold text-elevarm-grey disabled:opacity-40 hover:border-elevarm-black hover:text-elevarm-black transition-colors disabled:hover:border-elevarm-neutral-100 disabled:hover:text-elevarm-grey"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12.8334 7H1.16675M1.16675 7L6.33341 1.83333M1.16675 7L6.33341 12.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(TOTAL_PAGES, totalPages) }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`h-9 w-9 rounded-md text-sm font-semibold transition-colors ${
                    currentPage === n
                      ? 'bg-elevarm-info-100 text-elevarm-cobalt'
                      : 'text-elevarm-grey hover:bg-elevarm-neutral'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-elevarm-black text-sm font-semibold text-elevarm-black hover:bg-elevarm-neutral transition-colors disabled:opacity-40 disabled:border-elevarm-neutral-100 disabled:text-elevarm-grey"
            >
              Next
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.16675 7H12.8334M12.8334 7L7.00008 1.16669M12.8334 7L7.00008 12.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
