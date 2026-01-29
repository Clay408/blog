import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Canvas } from '@/components/3d/Canvas';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zhe - Tech Blog',
  description: 'A personal tech blog with 3D particle effects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Canvas />
        <Header />
        <main className="mx-auto min-h-screen w-full max-w-7xl px-4 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
