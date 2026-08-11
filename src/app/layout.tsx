import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Tauheed News - Portal Berita Islam Kontemporer & Ilmu Syar\'i',
  description: 'Portal berita Islam pilihan berbasis Al-Qur\'an dan Sunnah sesuai pemahaman Salafus Shalih. Sajian berita utama, kajian kitab, tuntunan Islam, dan analisis syar\'i.',
  keywords: ['Tauheed News', 'Berita Islam', 'Kajian Sunnah', 'Aqidah', 'Tauhid', 'Fatwa Fikih', 'Haramain'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap" />
      </head>
      <body className="bg-paper-white dark:bg-primary text-on-surface dark:text-gray-100 min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}

