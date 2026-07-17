'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import { getPostPath } from '@/lib/blogUtils';
import {
  blogPosts,
  blogCategories,
  POSTS_PER_PAGE,
  TOTAL_PAGES,
} from '@/data/blogContent';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';

function BlogIndexContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagFromUrl = searchParams.get('tag')?.trim() ?? '';

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>('All Posts');
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(tagFromUrl);

  useEffect(() => {
    setActiveTag(tagFromUrl);
    setPage(1);
    if (tagFromUrl) setCategory('All Posts');
  }, [tagFromUrl]);

  const featured = blogPosts.find((p) => p.featured)!;

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      // When filtering by tag, include featured posts in the list
      if (!activeTag && post.featured) return false;

      const matchCategory = category === 'All Posts' || post.category === category;
      const matchTag =
        !activeTag ||
        post.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());

      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchTag && matchSearch;
    });
  }, [category, search, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  function clearTag() {
    setActiveTag('');
    setPage(1);
    router.replace('/blog', { scroll: false });
  }

  function selectCategory(cat: string) {
    setCategory(cat);
    setPage(1);
    if (activeTag) {
      setActiveTag('');
      router.replace('/blog', { scroll: false });
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {!activeTag && (
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
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      <section className={`py-12 sm:py-16 ${activeTag ? 'pt-header' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-elevarm-black font-display tracking-tight">
              {activeTag ? `Tag: ${activeTag}` : 'Resources and Insights'}
            </h2>
            <p className="text-elevarm-grey text-base">
              {activeTag
                ? `Artikel yang memakai tag “${activeTag}”.`
                : 'The latest industry news, interviews, technologies, and resources.'}
            </p>
            {activeTag && (
              <button
                type="button"
                onClick={clearTag}
                className="inline-flex items-center gap-2 mt-2 rounded-full border border-elevarm-cobalt/30 bg-elevarm-cobalt/5 px-3 py-1.5 text-sm font-semibold text-elevarm-cobalt hover:bg-elevarm-cobalt/10"
              >
                Hapus filter tag
                <span aria-hidden>×</span>
              </button>
            )}
          </ScrollReveal>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-elevarm-neutral-100 pb-4">
            <nav className="flex flex-wrap gap-6">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => selectCategory(cat)}
                  className={`pb-3 text-sm font-semibold transition-colors border-b-2 -mb-[17px] ${
                    category === cat && !activeTag
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
                <path
                  d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14L11.1 11.1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Type to search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-9 pr-4 py-2.5 border-2 border-slate-300 bg-slate-50 rounded-lg text-sm text-elevarm-black placeholder:text-slate-500 focus:outline-none focus:border-elevarm-cobalt focus:bg-white transition-colors"
              />
            </div>
          </div>

          {pagePosts.length > 0 ? (
            <StaggerReveal
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              stagger={0.08}
            >
              {pagePosts.map((post) => (
                <StaggerItem key={post.id}>
                  <BlogCard post={post} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          ) : (
            <p className="text-center text-elevarm-grey py-12">
              Tidak ada artikel untuk filter ini.
            </p>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-elevarm-neutral-100">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-elevarm-neutral-100 text-sm font-semibold text-elevarm-grey disabled:opacity-40 hover:border-elevarm-black hover:text-elevarm-black transition-colors disabled:hover:border-elevarm-neutral-100 disabled:hover:text-elevarm-grey"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M12.8334 7H1.16675M1.16675 7L6.33341 1.83333M1.16675 7L6.33341 12.1667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(TOTAL_PAGES, totalPages) }, (_, i) => i + 1).map(
                (n) => (
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
                ),
              )}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-elevarm-neutral-100 text-sm font-semibold text-elevarm-grey disabled:opacity-40 hover:border-elevarm-black hover:text-elevarm-black transition-colors disabled:hover:border-elevarm-neutral-100 disabled:hover:text-elevarm-grey"
            >
              Next
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1.16675 7H12.8334M12.8334 7L7.66675 1.83333M12.8334 7L7.66675 12.1667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-header flex items-center justify-center text-elevarm-grey">
          Memuat blog...
        </div>
      }
    >
      <BlogIndexContent />
    </Suspense>
  );
}
