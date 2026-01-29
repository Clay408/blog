'use client';

import { useState, useMemo } from 'react';
import { GlowCard } from './GlowCard';
import { CategoryFilter } from './CategoryFilter';
import type { Post } from '.contentlayer/generated';

interface ArticleListProps {
  posts: Post[];
}

export function ArticleList({ posts }: ArticleListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 提取所有唯一的分类标签
  const categories = useMemo(() => {
    const allTags = posts.flatMap(post => post.tags || []);
    return Array.from(new Set(allTags)).sort();
  }, [posts]);

  // 根据选中的分类过滤文章
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter(post => post.tags?.includes(selectedCategory));
  }, [posts, selectedCategory]);

  if (posts.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[var(--muted-foreground)]">暂无文章</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
      <div className="flex gap-8">
        {/* 左侧文章列表区域 */}
        <div className="flex-1 relative">
          {/* 中央时间轴线条 - 从第一个节点位置开始 */}
          <div className="absolute left-1/2 top-8 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-[var(--primary)] via-[var(--primary)]/50 to-transparent" />

          {/* 时间轴底部装饰 */}
          <div className="absolute left-1/2 bottom-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--primary)]/30" />

          <div className="space-y-12 sm:space-y-16 pb-8">
            {filteredPosts.length === 0 ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                  <p className="text-lg text-[var(--muted-foreground)]">该分类下暂无文章</p>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="mt-4 text-sm text-[var(--primary)] hover:underline"
                  >
                    查看全部文章
                  </button>
                </div>
              </div>
            ) : (
              filteredPosts.map((post, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={post._id}
                    className="relative group"
                  >
                    {/* 时间轴节点 */}
                    <div className="absolute left-1/2 top-8 z-10 flex -translate-x-1/2">
                      <div className="relative">
                        <div className="h-4 w-4 rounded-full bg-[var(--background)] border-2 border-[var(--primary)] group-hover:scale-150 group-hover:bg-[var(--primary)] transition-all duration-300" />
                        <div className="absolute inset-0 h-4 w-4 rounded-full bg-[var(--primary)] animate-ping opacity-20" />
                      </div>
                    </div>

                    {/* 文章布局容器 - 使用 grid 布局确保左右对称 */}
                    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-4">
                      {/* 左侧文章区域 */}
                      <div className={isLeft ? 'md:pr-8' : 'invisible md:pr-8'}>
                        {isLeft && <GlowCard post={post} />}
                      </div>

                      {/* 中间占位 - 给时间轴留空间 */}
                      <div className="w-16 shrink-0" />

                      {/* 右侧文章区域 */}
                      <div className={!isLeft ? 'md:pl-8' : 'invisible md:pl-8'}>
                        {!isLeft && <GlowCard post={post} />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 右侧分类筛选侧边栏 */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
                 style={{
                   background: 'linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4) border-box',
                   boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
                 }}
            >
              <h3 className="mb-4 text-lg font-bold text-[var(--card-foreground)]">文章分类</h3>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                isSidebar={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
