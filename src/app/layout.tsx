import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import ConditionalFooter from '@/components/ConditionalFooter';
import ScrollToHash from '@/components/ScrollToHash';

export const metadata: Metadata = {
  title: 'BISA — Platform Ekonomi Sirkular Biomassa Pertanian',
  description:
    'BISA menghubungkan petani, pengepul, dan industri biochar dalam satu aplikasi mobile: marketplace 3 layer, AI prediksi grade biochar, GIS supply-demand, escrow, dan forum edukasi. Pilot Lombok Tengah, NTB.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-white text-elevarm-text-dark">
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
          <Navbar />
        </header>
        <main className="flex-grow flex flex-col">{children}</main>
        <ScrollToHash />
        <ConditionalFooter />
      </body>
    </html>
  );
}
