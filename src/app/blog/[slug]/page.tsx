import { allPosts } from '.contentlayer/generated';
import { notFound } from 'next/navigation';
import { BlogPostContent } from '@/components/blog/BlogPostContent';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.sourceFileName.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = allPosts.find(
    (p) => p._raw.sourceFileName.replace(/\.mdx$/, '') === slug
  );

  if (!post) return {};

  return {
    title: `${post.title} - Zhe`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = allPosts.find(
    (p) => p._raw.sourceFileName.replace(/\.mdx$/, '') === slug
  );

  if (!post) {
    notFound();
  }

  // Extract only the serializable data needed for the client component
  const { title, description, date, tags, body } = post;
  const serializedPost = {
    title,
    description,
    date,
    tags,
    body,
  };

  return <BlogPostContent post={serializedPost} />;
}
