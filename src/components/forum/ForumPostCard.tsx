import Link from 'next/link';
import { getForumPostPath } from '@/lib/forumPaths';
import { resolveMediaUrl } from '@/lib/media-url';
import {
  extractMediaUrls,
  formatForumDate,
  getCommentCount,
  type ForumPost,
} from '@/lib/forumApi';

function Avatar({ name, url }: { name: string; url?: string | null }) {
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  if (url) {
    const src = resolveMediaUrl(url) ?? url;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name} className="h-10 w-10 rounded-full object-cover bg-elevarm-neutral ring-2 ring-white" />
    );
  }
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elevarm-info-100 text-base font-bold text-elevarm-cobalt ring-2 ring-white">
      {initial}
    </span>
  );
}

function VoteColumn({ score }: { score: number }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-0.5 px-3 py-4 sm:px-4 bg-elevarm-neutral/80 border-r border-elevarm-neutral-100">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="text-elevarm-grey">
        <path
          d="M12 4l-6 8h12l-6-8z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-base sm:text-lg font-bold tabular-nums text-elevarm-cobalt leading-none">
        {score}
      </span>
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

export default function ForumPostCard({ post }: { post: ForumPost }) {
  const author = post.user?.fullName ?? 'Pengguna';
  const preview = post.contentPreview ?? post.content ?? '';
  const images = extractMediaUrls(post.mediaUrls);
  const thumb = images[0];
  const comments = getCommentCount(post);

  return (
    <Link
      href={getForumPostPath(post.id)}
      className="group flex overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-elevarm-cobalt/30 hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
    >
      <VoteColumn score={post.upvotes} />

      <div className="flex min-w-0 flex-1 gap-4 p-4 sm:p-5">
        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-elevarm-grey">
            <div className="flex items-center gap-2">
              <Avatar name={author} url={post.user?.avatarUrl} />
              <span className="font-semibold text-elevarm-black">{author}</span>
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <time className="font-medium">{formatForumDate(post.createdAt)}</time>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-elevarm-black leading-snug group-hover:text-elevarm-cobalt transition-colors line-clamp-2">
            {post.title}
          </h3>

          {preview && (
            <p className="text-sm sm:text-base text-elevarm-grey leading-relaxed line-clamp-2">
              {preview}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-elevarm-grey">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {comments} komentar
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-elevarm-grey">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
              </svg>
              {post.viewCount} tayangan
            </span>
          </div>

          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-0.5">
              {post.tags.slice(0, 4).map((tag) => (
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

        {thumb && (
          <div className="hidden sm:block shrink-0 self-start">
            <div className="h-20 w-28 overflow-hidden rounded-lg border border-elevarm-neutral-100 bg-elevarm-neutral">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
