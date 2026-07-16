/** Canonical public URL for a forum post on the marketing site. */
export function getForumPostPath(id: string): string {
  return `/forum/posts/${id}`;
}

/** Canonical public URL for a forum group on the marketing site. */
export function getForumGroupPath(id: string): string {
  return `/forum/groups/${id}`;
}
