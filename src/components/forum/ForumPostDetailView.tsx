'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ForumAppCta from '@/components/forum/ForumAppCta';
import ForumAvatar from '@/components/forum/ForumAvatar';
import ForumCommentThread from '@/components/forum/ForumCommentThread';
import {
  extractMediaUrls,
  fetchForumPost,
  formatForumDate,
  getCommentCount,
  type ForumPost,
} from '@/lib/forumApi';
import { ScrollReveal } from '@/components/ScrollReveal';

function VoteColumn({ score }: { score: number }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-0.5 px-3 py-5 sm:px-4 bg-elevarm-neutral/80 border-r border-slate-200">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="text-elevarm-grey">
        <path
          d="M12 4l-6 8h12l-6-8z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-lg font-bold tabular-nums text-elevarm-cobalt leading-none">{score}</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="text-elevarm-grey">
        <path
          d="M12 20l6-8H6l6 8z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function ForumPostDetailView({ id }: { id: string }) {
  const [post, setPost] = useState<ForumPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchForumPost(id)
      .then((res) => {
        if (!cancelled) setPost(res.data);
      })
      .catch(() => {
        if (!cancelled) setError('Posting tidak ditemukan.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-elevarm-neutral pt-header flex items-center justify-center">
        <p className="text-elevarm-grey">Memuat diskusi...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-elevarm-neutral pt-header">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
          <p className="text-elevarm-grey">{error ?? 'Posting tidak ditemukan.'}</p>
          <Link href="/forum" className="text-elevarm-cobalt font-semibold hover:underline">
            ← Kembali ke forum
          </Link>
        </div>
      </div>
    );
  }

  const author = post.user?.fullName ?? 'Pengguna';
  const images = extractMediaUrls(post.mediaUrls);
  const comments = post.comments ?? [];

  return (
    <div className="min-h-screen bg-elevarm-neutral">
      <article className="pt-header pb-14 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
          <Link
            href="/forum"
            className="inline-flex text-sm font-semibold text-elevarm-cobalt hover:underline"
          >
            ← Forum Edukasi
          </Link>

          <ScrollReveal>
            <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_12px_28px_-6px_rgba(15,23,42,0.14),0_6px_14px_-4px_rgba(0,0,0,0.08)]">
              <div className="flex">
                <VoteColumn score={post.upvotes} />
                <div className="min-w-0 flex-1 p-5 sm:p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <ForumAvatar name={author} url={post.user?.avatarUrl} />
                    <div>
                      <p className="font-semibold text-elevarm-black">{author}</p>
                      <p className="text-sm text-elevarm-grey">{formatForumDate(post.createdAt)}</p>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-elevarm-black font-display leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-elevarm-grey">
                    <span>{getCommentCount(post)} komentar</span>
                    <span>{post.viewCount} tayangan</span>
                  </div>

                  {images.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {images.map((url) => (
                        <div key={url} className="rounded-lg overflow-hidden bg-elevarm-neutral border border-slate-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="" className="w-full h-auto object-cover max-h-72" />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-base sm:text-lg text-elevarm-black leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>

                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-elevarm-info-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-elevarm-cobalt"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {comments.length > 0 ? (
                <div className="border-t border-slate-200 px-5 sm:px-6 py-5 sm:py-6">
                  <ForumCommentThread comments={comments} />
                </div>
              ) : null}
            </div>
          </ScrollReveal>

          <ForumAppCta compact title="Balas dan vote di aplikasi" />
        </div>
      </article>
    </div>
  );
}
