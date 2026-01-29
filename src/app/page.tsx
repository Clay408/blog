'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div>
          <h1 className="mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl">
            Welcome to My Tech Blog
          </h1>

          <p className="mb-8 text-lg text-[var(--muted-foreground)] sm:text-xl md:text-2xl">
            Exploring the intersection of technology, creativity, and innovation
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/blog">
              <button className="rounded-full bg-[var(--primary)] px-6 py-2.5 font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary)]/90 min-w-[140px]">
                阅读文章
              </button>
            </Link>
            <Link href="/about">
              <button className="rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-2.5 font-medium text-[var(--card-foreground)] transition-colors hover:bg-[var(--secondary)] min-w-[140px]">
                关于我
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
