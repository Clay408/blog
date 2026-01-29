'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import type { Post } from '.contentlayer/generated';

interface GlowCardProps {
  post: Post;
}

export function GlowCard({ post }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  return (
    <Link href={post.url} className="block">
      <motion.div
        ref={cardRef}
        whileHover={{ scale: 1.01 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="glow-card relative rounded-xl bg-[var(--card)] overflow-hidden"
        style={{
          border: '1px solid transparent',
          background: 'linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4) border-box',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
        }}
      >
        {/* 鼠标光效追踪 */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
            }}
          />
        )}

        {/* 鼠标边缘光效 */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1), transparent 50%)`,
            }}
          />
        )}

        {/* 赛博朋克网格背景 */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }} />
        </div>

        {/* 霓虹光效 - 四角装饰 */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-[var(--primary)] opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[var(--primary)] opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-[var(--primary)] opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-[var(--primary)] opacity-40 pointer-events-none" />

        {/* 科技感扫描线 */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div className="scan-line" />
        </div>

        {/* 悬停时的霓虹光晕 */}
        <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
             style={{
               boxShadow: 'inset 0 0 60px rgba(59, 130, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.3)',
             }}
        />

        {/* 卡片内容 */}
        <div className="relative p-6">
          {/* 顶部行：日期和标签 */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {/* 日期徽章 */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--secondary)] px-3 py-1 text-xs font-medium text-[var(--secondary-foreground)]"
                 style={{
                   border: '1px solid rgba(59, 130, 246, 0.3)',
                   boxShadow: '0 0 10px rgba(59, 130, 246, 0.15)',
                 }}
            >
              <svg
                className="h-3 w-3 text-[var(--primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={post.date.toString()}>
                {formatDate(post.date)}
              </time>
            </div>

            {/* 标签 */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-[var(--primary)]/10 px-2.5 py-1 text-xs font-medium"
                    style={{
                      color: 'var(--primary)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="inline-flex items-center rounded-full bg-[var(--secondary)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)]">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* 标题 - 霓虹文字效果 */}
          <h2 className="mb-3 text-xl font-bold text-[var(--card-foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug"
              style={{
                textShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
              }}
          >
            {post.title}
          </h2>

          {/* 描述 */}
          <p className="mb-4 text-sm text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
            {post.description}
          </p>

          {/* 阅读更多 */}
          <div className="flex items-center text-sm font-medium"
               style={{
                 color: 'var(--primary)',
                 textShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
               }}
          >
            阅读全文
            <svg
              className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.4))',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* 赛博朋克扫描线动画 */}
        <style jsx>{`
          .glow-card:hover .scan-line {
            opacity: 1;
          }
          .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent);
            opacity: 0;
            animation: scan 3s linear infinite;
          }
          @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
          }
        `}</style>
      </motion.div>
    </Link>
  );
}
