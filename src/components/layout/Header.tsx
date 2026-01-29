'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-xl font-bold text-[var(--primary)]">
            &lt;Zhe /&gt;
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'relative px-6 py-2 text-sm font-medium transition-colors hover:text-[var(--primary)] rounded-lg hover:bg-[var(--secondary)]',
                  pathname === item.href
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--muted-foreground)]'
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[var(--secondary)] px-4 py-2 text-sm font-medium text-[var(--secondary-foreground)] transition-colors hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
