import type { Metadata } from 'next';
import ForumPostDetailView from '@/components/forum/ForumPostDetailView';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Diskusi Forum | BISA`,
    description: `Detail diskusi forum edukasi BISA — posting ${id}`,
  };
}

export default async function ForumPostDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ForumPostDetailView id={id} />;
}
