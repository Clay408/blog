'use client';

import { allPosts } from '.contentlayer/generated';
import { ArticleList } from '@/components/blog/ArticleList';
import { motion } from 'framer-motion';

export default function BlogPage() {
  // Sort posts by date
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="mb-4 text-4xl font-bold text-[var(--card-foreground)] sm:text-5xl">
          Blog
        </h1>
        <p className="text-lg text-[var(--muted-foreground)]">
          Thoughts, tutorials, and insights on technology and software development
        </p>
      </motion.div>

      <ArticleList posts={posts} />
    </div>
  );
}
