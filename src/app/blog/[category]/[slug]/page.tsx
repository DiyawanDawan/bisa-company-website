import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CopyLinkButton from '@/components/CopyLinkButton';
import BlogCard from '@/components/BlogCard';
import {
  getPostBySlugs,
  getRelatedPosts,
  getAllPostParams,
} from '@/lib/blogUtils';

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostBySlugs(category, slug);
  if (!post) return { title: 'Blog | BISA' };
  return {
    title: `${post.title} | BISA Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const post = getPostBySlugs(category, slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <div className="min-h-screen bg-white">
      <article className="pt-header pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-elevarm-cobalt hover:underline"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12.8334 7H1.16675M1.16675 7L6.33341 1.83333M1.16675 7L6.33341 12.1667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blog
          </Link>

          <div className="space-y-4">
            <span className="text-sm font-bold text-elevarm-cobalt uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-elevarm-black font-display leading-tight">
              {post.title}
            </h1>
            <p className="text-sm text-elevarm-grey">Published on {post.date}</p>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-elevarm-neutral">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          <div className="prose-elevarm space-y-8">
            {post.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                {section.heading && (
                  <h2 className="text-lg font-bold text-elevarm-black">{section.heading}</h2>
                )}
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-base text-elevarm-grey leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-elevarm-neutral-100 space-y-6">
            {post.tags.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-elevarm-grey">
                  Post tag(s)
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-elevarm-neutral text-xs font-semibold text-elevarm-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-elevarm-grey mb-1">
                  Written by
                </p>
                <p className="text-sm font-semibold text-elevarm-black">{post.author}</p>
              </div>
              <CopyLinkButton />
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 bg-elevarm-neutral/40 border-t border-elevarm-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-elevarm-black font-display">
                Related Articles
              </h2>
              <p className="text-elevarm-grey text-base">
                The latest industry news, interviews, technologies, and resources.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {related.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
