import type { Metadata } from 'next';
import ForumGroupDetailView from '@/components/forum/ForumGroupDetailView';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Grup Forum | BISA`,
    description: `Komunitas forum BISA — grup ${id}`,
  };
}

export default async function ForumGroupDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ForumGroupDetailView id={id} />;
}
