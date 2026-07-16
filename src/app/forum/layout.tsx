import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forum & Grup Komunitas — BISA',
  description:
    'Forum edukasi biochar, IoT pertanian, dan rantai pasok organik. Jelajahi diskusi publik dan grup komunitas BISA.',
};

export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
