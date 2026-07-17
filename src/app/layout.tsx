import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import ConditionalFooter from '@/components/ConditionalFooter';
import ScrollToHash from '@/components/ScrollToHash';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BISA — Platform Ekonomi Sirkular Biomassa Pertanian',
  description:
    'BISA menghubungkan petani, pengepul, dan industri biochar dalam satu aplikasi mobile: marketplace 3 layer, AI prediksi grade biochar, GIS supply-demand, escrow, dan forum edukasi. Pilot Lombok Tengah, NTB.',
  icons: {
    icon: [{ url: '/icon.png?v=3', type: 'image/png', sizes: '512x512' }],
    apple: [{ url: '/apple-icon.png?v=3', type: 'image/png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`h-full scroll-smooth ${inter.variable} ${poppins.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className={`${inter.className} min-h-full flex flex-col antialiased bg-white text-elevarm-text-dark`}>
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
