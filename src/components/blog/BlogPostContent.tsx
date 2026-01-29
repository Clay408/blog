'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MDXContent } from './MDXContent';
import { formatDate } from '@/lib/utils';
import type { Post } from '.contentlayer/generated';

interface BlogPostContentProps {
  post: Post;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        {/* Back button */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to blog
        </Link>

        {/* Article header */}
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-4xl font-bold text-[var(--card-foreground)] sm:text-5xl"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]"
          >
            <time dateTime={post.date.toString()}>
              {formatDate(post.date)}
            </time>
            {post.tags && post.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--secondary)] px-3 py-1 text-xs text-[var(--secondary-foreground)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {post.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-lg text-[var(--muted-foreground)]"
            >
              {post.description}
            </motion.p>
          )}
        </header>

        {/* Article content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="prose prose-invert max-w-none"
        >
          <MDXContent code={post.body.code} />
        </motion.div>
      </motion.article>
    </div>
  );
}
