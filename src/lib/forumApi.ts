import { resolveMediaUrl } from '@/lib/media-url';

export type ForumUser = {
  id: string;
  fullName: string;
  avatarUrl?: string | null;
  role?: string;
};

export type ForumMediaItem = { url: string; type?: string };

export type ForumPost = {
  id: string;
  title: string;
  content?: string;
  contentPreview?: string;
  mediaUrls?: (string | ForumMediaItem)[] | null;
  tags?: string[] | null;
  upvotes: number;
  downvotes: number;
  viewCount: number;
  commentCount?: number;
  createdAt: string;
  groupId?: string | null;
  user?: ForumUser;
  _count?: { comments: number };
  comments?: ForumComment[];
};

export type ForumComment = {
  id: string;
  content: string;
  createdAt: string;
  upvotes?: number;
  user?: ForumUser;
  mediaUrls?: (string | ForumMediaItem)[] | null;
  parent?: { id: string; user?: { fullName: string } };
  replies?: ForumComment[];
};

export type ForumGroup = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  isPublic: boolean;
  memberCount: number;
  postCount: number;
  createdAt: string;
  owner: ForumUser;
  isMember?: boolean;
};

type ApiMeta = { success: boolean; status: number; message: string };

type Paginated<T> = {
  meta: ApiMeta;
  data: T[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
};

type Single<T> = { meta: ApiMeta; data: T };

const API_BASE = '/api/backend';

async function forumFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { Accept: 'application/json', ...init?.headers },
  });
  if (!res.ok) {
    throw new Error(`Forum API error: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function extractMediaUrls(
  media?: (string | ForumMediaItem)[] | null,
): string[] {
  if (!media?.length) return [];
  return media
    .map((item) => (typeof item === 'string' ? item : item?.url))
    .filter((url): url is string => Boolean(url))
    .map((url) => resolveMediaUrl(url) ?? url);
}

export function formatForumDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function getCommentCount(post: ForumPost): number {
  return post._count?.comments ?? post.commentCount ?? countAllComments(post.comments ?? []);
}

export function countAllComments(comments: ForumComment[]): number {
  return comments.reduce((sum, c) => sum + 1 + countAllComments(c.replies ?? []), 0);
}

export async function fetchForumPosts(params?: {
  page?: number;
  limit?: number;
  groupId?: string;
  keyword?: string;
  sortBy?: 'newest' | 'popular' | 'trending';
}) {
  const q = new URLSearchParams();
  if (params?.page) q.set('page', String(params.page));
  if (params?.limit) q.set('limit', String(params.limit));
  if (params?.groupId) q.set('groupId', params.groupId);
  if (params?.keyword) q.set('keyword', params.keyword);
  if (params?.sortBy) q.set('sortBy', params.sortBy);
  const query = q.toString();
  return forumFetch<Paginated<ForumPost>>(`/forum/posts${query ? `?${query}` : ''}`);
}

export async function fetchForumPost(id: string) {
  return forumFetch<Single<ForumPost>>(`/forum/posts/${id}`);
}

export async function fetchForumGroups(params?: {
  page?: number;
  limit?: number;
  keyword?: string;
}) {
  const q = new URLSearchParams();
  if (params?.page) q.set('page', String(params.page));
  if (params?.limit) q.set('limit', String(params.limit));
  if (params?.keyword) q.set('keyword', params.keyword);
  const query = q.toString();
  return forumFetch<Paginated<ForumGroup>>(`/forum/groups${query ? `?${query}` : ''}`);
}

export async function fetchForumGroup(id: string) {
  return forumFetch<Single<ForumGroup>>(`/forum/groups/${id}`);
}
