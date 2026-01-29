import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Zhe',
  description: 'Articles about technology, programming, and more',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
