import { allPosts } from '.contentlayer/generated';
import { ArticleList } from '@/components/blog/ArticleList';

// Sort posts by date at build time
const posts = allPosts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-[var(--card-foreground)] sm:text-5xl">
          Blog
        </h1>
        <p className="text-lg text-[var(--muted-foreground)]">
          Thoughts, tutorials, and insights on technology and software development
        </p>
      </div>

      <ArticleList posts={posts} />
    </div>
  );
}
