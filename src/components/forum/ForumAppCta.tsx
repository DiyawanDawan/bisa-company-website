import AppDownloadSection from '@/components/AppDownloadSection';

type ForumAppCtaProps = {
  title?: string;
  description?: string;
  compact?: boolean;
};

export default function ForumAppCta({
  title = 'Ikut diskusi di aplikasi BISA',
  description = 'Posting, komentar, gabung grup, dan notifikasi real-time tersedia di aplikasi mobile.',
  compact = false,
}: ForumAppCtaProps) {
  return (
    <AppDownloadSection
      title={title}
      description={description}
      compact={compact}
    />
  );
}
