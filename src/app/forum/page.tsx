'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ForumPostCard from '@/components/forum/ForumPostCard';
import ForumGroupCard from '@/components/forum/ForumGroupCard';
import ForumSearchInput from '@/components/forum/ForumSearchInput';
import AppDownloadSection from '@/components/AppDownloadSection';
import { forumFeatures, forumHeroCopy } from '@/data/forumContent';
import { fetchForumGroups, fetchForumPosts, type ForumGroup, type ForumPost } from '@/lib/forumApi';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';

type SortKey = 'trending' | 'newest' | 'popular';

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [groups, setGroups] = useState<ForumGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupsLoading, setGroupsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupsError, setGroupsError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>('trending');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    setGroupsLoading(true);
    setGroupsError(null);
    fetchForumGroups({ page: 1, limit: 6 })
      .then((res) => {
        if (!cancelled) setGroups(res.data ?? []);
      })
      .catch(() => {
        if (!cancelled) setGroupsError('Grup publik tidak dapat dimuat.');
      })
      .finally(() => {
        if (!cancelled) setGroupsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchForumPosts({ page: 1, limit: 12, sortBy, keyword: search || undefined })
      .then((res) => {
        if (!cancelled) setPosts(res.data ?? []);
      })
      .catch(() => {
        if (!cancelled) setError('Tidak dapat memuat diskusi. Pastikan backend BISA berjalan.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [sortBy, search]);

  const sortTabs: { key: SortKey; label: string }[] = useMemo(
    () => [
      { key: 'trending', label: 'Trending' },
      { key: 'newest', label: 'Terbaru' },
      { key: 'popular', label: 'Populer' },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#135122] via-[#1a4823] to-[#0f3d1a] text-white pt-header pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <ScrollReveal className="space-y-4 max-w-2xl">
              <span className="text-sm font-bold text-elevarm-accent uppercase tracking-wider">
                {forumHeroCopy.eyebrow}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold font-display leading-tight">
                {forumHeroCopy.title}
              </h1>
              <p className="text-elevarm-zinc text-sm sm:text-base leading-relaxed">
                {forumHeroCopy.intro}
              </p>
              <Link
                href="/forum/groups"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/20 transition-colors"
              >
                Jelajahi Grup Komunitas →
              </Link>
            </ScrollReveal>
            <ScrollReveal variant="fadeLeft" delay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:max-w-xl">
              {forumFeatures.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-4"
                >
                  <p className="text-sm font-bold text-white">{f.title}</p>
                  <p className="text-xs text-white/80 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Grup publik */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <ScrollReveal className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-elevarm-black font-display">
                  Grup Komunitas Publik
                </h2>
                <p className="text-elevarm-grey text-sm sm:text-base">
                  Jelajahi grup tematik tanpa login — gabung & posting lewat aplikasi mobile.
                </p>
              </ScrollReveal>
              <Link
                href="/forum/groups"
                className="text-sm font-semibold text-elevarm-cobalt hover:underline shrink-0"
              >
                Lihat semua grup →
              </Link>
            </div>

            {groupsLoading && (
              <p className="text-center text-elevarm-grey py-8">Memuat grup...</p>
            )}
            {groupsError && !groupsLoading && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 text-center">
                {groupsError} Coba muat ulang halaman. Jika masalah berlanjut, hubungi tim BISA.
              </div>
            )}
            {!groupsLoading && !groupsError && groups.length === 0 && (
              <div className="rounded-xl border border-elevarm-neutral-100 bg-elevarm-neutral p-6 text-center space-y-2">
                <p className="text-elevarm-grey text-sm">Belum ada grup publik tersedia saat ini.</p>
              </div>
            )}
            {!groupsLoading && groups.length > 0 && (
              <StaggerReveal className="space-y-3 max-w-5xl" stagger={0.04}>
                {groups.map((group) => (
                  <StaggerItem key={group.id}>
                    <ForumGroupCard group={group} />
                  </StaggerItem>
                ))}
              </StaggerReveal>
            )}
          </div>

          {/* Feed diskusi */}
          <div className="space-y-8 border-t border-elevarm-neutral-100 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-elevarm-neutral-100 pb-4">
            <nav className="flex flex-wrap gap-6">
              {sortTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSortBy(tab.key)}
                  className={`pb-3 text-base font-semibold transition-colors border-b-2 -mb-[17px] ${
                    sortBy === tab.key
                      ? 'text-elevarm-cobalt border-elevarm-cobalt'
                      : 'text-elevarm-grey border-transparent hover:text-elevarm-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            <ForumSearchInput
              className="w-full sm:w-72"
              placeholder="Cari diskusi..."
              value={search}
              onChange={setSearch}
            />
          </div>

          {loading && (
            <p className="text-center text-elevarm-grey py-16">Memuat diskusi forum...</p>
          )}
          {error && !loading && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center space-y-2">
              <p className="text-sm font-semibold text-amber-900">{error}</p>
              <p className="text-xs text-amber-800">
                Coba muat ulang halaman. Diskusi forum membutuhkan koneksi ke server BISA.
              </p>
            </div>
          )}
          {!loading && !error && posts.length === 0 && (
            <p className="text-center text-elevarm-grey py-16">Belum ada diskusi publik.</p>
          )}
          {!loading && posts.length > 0 && (
            <StaggerReveal className="space-y-3 max-w-5xl" stagger={0.04}>
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <ForumPostCard post={post} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          )}
          </div>
        </div>
      </section>

      <AppDownloadSection
        title="Forum & grup di genggaman"
        description="Gabung komunitas, buat thread, balas komentar, dan dapatkan notifikasi diskusi langsung dari aplikasi BISA."
      />
    </div>
  );
}
