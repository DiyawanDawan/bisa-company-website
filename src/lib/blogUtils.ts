import { blogPosts, type BlogPost } from '@/data/blogContent';

export function categoryToSlug(category: BlogPost['category']): string {
  const map: Record<BlogPost['category'], string> = {
    'Tips Tani': 'tips-tani',
    Berita: 'berita',
    'Cerita Petani': 'cerita-petani',
  };
  return map[category];
}

export function getPostPath(post: BlogPost): string {
  return `/blog/${post.categorySlug}/${post.slug}`;
}

export function getPostBySlugs(categorySlug: string, slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.categorySlug === categorySlug && p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, limit);
}

export function getAllPostParams(): { category: string; slug: string }[] {
  return blogPosts.map((p) => ({ category: p.categorySlug, slug: p.slug }));
}
