'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ForumPostCard from '@/components/forum/ForumPostCard';
import ForumAppCta from '@/components/forum/ForumAppCta';
import { fetchForumGroup, fetchForumPosts, type ForumGroup, type ForumPost } from '@/lib/forumApi';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';

function StatPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-elevarm-black">
      <span className="text-elevarm-cobalt">{icon}</span>
      {label}
    </span>
  );
}

export default function ForumGroupDetailView({ id }: { id: string }) {
  const [group, setGroup] = useState<ForumGroup | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([
      fetchForumGroup(id),
      fetchForumPosts({ groupId: id, page: 1, limit: 12, sortBy: 'newest' }),
    ])
      .then(([groupRes, postsRes]) => {
        if (cancelled) return;
        setGroup(groupRes.data);
        setPosts(postsRes.data ?? []);
      })
      .catch(() => {
        if (!cancelled) setError('Grup tidak ditemukan atau backend tidak tersedia.');
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
        <p className="text-elevarm-grey">Memuat grup...</p>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="min-h-screen bg-elevarm-neutral pt-header">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
          <p className="text-elevarm-grey">{error ?? 'Grup tidak ditemukan.'}</p>
          <Link href="/forum/groups" className="text-elevarm-cobalt font-semibold hover:underline">
            ← Kembali ke daftar grup
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-elevarm-neutral">
      {/* Hero banner — full width */}
      <section className="pt-header">
        <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80 overflow-hidden bg-gradient-to-br from-[#135122] to-[#1a7a34]">
          {group.bannerUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={group.bannerUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, #135122 0%, rgb(19 81 34 / 0.85) 35%, rgb(19 81 34 / 0.35) 58%, transparent 78%)',
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <Link
                href="/forum/groups"
                className="inline-flex items-center gap-1 text-sm font-semibold text-white/95 hover:text-white hover:underline drop-shadow"
              >
                ← Semua grup
              </Link>
            </div>

            <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-elevarm-light-green mb-2">
                Komunitas Forum
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display leading-tight drop-shadow-md max-w-4xl">
                {group.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:text-base font-semibold text-white/90">
                <span>{group.memberCount} anggota</span>
                <span>{group.postCount} posting</span>
                <span>Admin: {group.owner.fullName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info grup — avatar overlap hero */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex flex-col sm:flex-row gap-5 sm:gap-6 pb-8 pt-0">
              <div className="relative -mt-12 sm:-mt-14 shrink-0 self-start z-10">
                <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl border-4 border-white bg-elevarm-neutral overflow-hidden shadow-lg">
                  {group.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={group.avatarUrl} alt={group.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-4xl font-bold text-elevarm-cobalt">
                      {group.name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              <ScrollReveal className="min-w-0 flex-1 space-y-4 pt-2 sm:pt-16">
                {group.description && (
                  <p className="text-base sm:text-lg text-elevarm-grey leading-relaxed max-w-4xl">
                    {group.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 border-t border-slate-100 sm:hidden">
                  <StatPill
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-elevarm-cobalt">
                        <path
                          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    label={`${group.memberCount} anggota`}
                  />
                  <StatPill
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-elevarm-cobalt">
                        <path
                          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    label={`${group.postCount} posting`}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-elevarm-black font-display">
              Diskusi di Grup
            </h2>
            <span className="text-sm font-semibold text-elevarm-grey">
              {posts.length} thread
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center space-y-3 shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-elevarm-info-100 text-elevarm-cobalt">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-elevarm-black">Belum ada diskusi di grup ini</p>
              <p className="text-sm text-elevarm-grey max-w-md mx-auto">
                Jadilah yang pertama memulai thread — buka posting lewat aplikasi mobile BISA.
              </p>
            </div>
          ) : (
            <StaggerReveal className="space-y-3" stagger={0.04}>
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <ForumPostCard post={post} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          )}

          <ForumAppCta
            compact
            title="Gabung grup ini di aplikasi"
            description="Bergabung, posting, dan terima notifikasi diskusi grup hanya tersedia di aplikasi mobile BISA."
          />
        </div>
      </section>
    </div>
  );
}
