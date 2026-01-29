'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-[var(--primary)]">
              &lt;Zhe /&gt;
            </span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-[var(--muted-foreground)]">
            <Link
              href="/"
              className="transition-colors hover:text-[var(--primary)]"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="transition-colors hover:text-[var(--primary)]"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-[var(--primary)]"
            >
              About
            </Link>
          </div>

          <p className="text-sm text-[var(--muted-foreground)]">
            © {new Date().getFullYear()} Zhe. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
