'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PageBackLink from '@/components/PageBackLink';
import ForumGroupCard from '@/components/forum/ForumGroupCard';
import ForumAppCta from '@/components/forum/ForumAppCta';
import { forumGroupsHeroCopy } from '@/data/forumContent';
import { fetchForumGroups, type ForumGroup } from '@/lib/forumApi';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';

export default function ForumGroupsPage() {
  const [groups, setGroups] = useState<ForumGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchForumGroups({ page: 1, limit: 24, keyword: search || undefined })
      .then((res) => {
        if (!cancelled) setGroups(res.data ?? []);
      })
      .catch(() => {
        if (!cancelled) setError('Tidak dapat memuat grup. Pastikan backend BISA berjalan.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [search]);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-white pt-header pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageBackLink />
          <ScrollReveal className="mt-8 space-y-4 max-w-3xl">
            <span className="text-sm font-bold text-elevarm-accent uppercase tracking-wider">
              {forumGroupsHeroCopy.eyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-elevarm-black font-display tracking-tight">
              {forumGroupsHeroCopy.title}
            </h1>
            <p className="text-elevarm-grey text-base leading-relaxed">
              {forumGroupsHeroCopy.intro}
            </p>
            <Link
              href="/forum"
              className="inline-flex text-sm font-semibold text-elevarm-cobalt hover:underline"
            >
              ← Kembali ke Forum Utama
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-14 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-elevarm-black font-display">Grup Publik</h2>
            <input
              type="text"
              placeholder="Cari grup..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 px-4 py-2.5 border border-elevarm-neutral-100 rounded-lg text-sm focus:outline-none focus:border-elevarm-cobalt"
            />
          </div>

          {loading && <p className="text-center text-elevarm-grey py-12">Memuat grup...</p>}
          {error && !loading && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center text-sm text-amber-900">
              {error}
            </div>
          )}
          {!loading && !error && groups.length === 0 && (
            <div className="rounded-xl border border-elevarm-neutral-100 bg-elevarm-neutral p-8 text-center space-y-3">
              <p className="text-elevarm-grey">Belum ada grup publik tersedia saat ini.</p>
            </div>
          )}
          {!loading && groups.length > 0 && (
            <StaggerReveal className="space-y-3 max-w-5xl mx-auto" stagger={0.04}>
              {groups.map((group) => (
                <StaggerItem key={group.id}>
                  <ForumGroupCard group={group} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          )}

          <ForumAppCta
            title="Buat grup baru di aplikasi"
            description="Banner grup, avatar, dan pengaturan privasi dikelola dari aplikasi mobile BISA — mirip konsep server Discord."
          />
        </div>
      </section>
    </div>
  );
}
