'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  isSidebar?: boolean;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory, isSidebar = false }: CategoryFilterProps) {
  return (
    <div className={isSidebar ? '' : 'mb-12'}>
      <div className={cn(
        'flex flex-col gap-2',
        !isSidebar && 'flex-row items-center justify-center flex-wrap'
      )}>
        {/* 全部文章按钮 */}
        <motion.button
          onClick={() => onSelectCategory(null)}
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'relative px-5 py-3 text-sm font-medium rounded-xl transition-all duration-300 text-left w-full group overflow-hidden',
            selectedCategory === null
              ? 'text-white'
              : 'text-[var(--muted-foreground)] hover:text-[var(--primary)]'
          )}
          style={
            selectedCategory === null
              ? {
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
                }
              : {
                  background: 'var(--secondary)',
                  border: '1px solid var(--border)',
                }
          }
        >
          {/* 赛博朋克扫描线效果 */}
          {selectedCategory === null && (
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <div className="scan-line" />
            </div>
          )}

          {/* 发光边框 */}
          {selectedCategory === null && (
            <div className="absolute inset-0 rounded-xl opacity-50"
                 style={{
                   boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.3)',
                 }}
            />
          )}

          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            全部文章
          </span>
        </motion.button>

        {/* 分类按钮 */}
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => onSelectCategory(category)}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              'relative px-5 py-3 text-sm font-medium rounded-xl transition-all duration-300 text-left w-full group overflow-hidden',
              selectedCategory === category
                ? 'text-white'
                : 'text-[var(--muted-foreground)] hover:text-[var(--primary)]'
            )}
            style={
              selectedCategory === category
                ? {
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
                  }
                : {
                    background: 'var(--secondary)',
                    border: '1px solid var(--border)',
                  }
            }
          >
            {/* 赛博朋克扫描线效果 */}
            {selectedCategory === category && (
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="scan-line" />
              </div>
            )}

            {/* 发光边框 */}
            {selectedCategory === category && (
              <div className="absolute inset-0 rounded-xl opacity-50"
                   style={{
                     boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.3)',
                   }}
              />
            )}

            {/* 悬停时的光效 */}
            {selectedCategory !== category && (
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{
                     background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                   }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              <span className="text-lg">#</span>
              {category}
            </span>

            {/* 赛博朋克扫描线动画 */}
            <style jsx>{`
              .scan-line {
                position: absolute;
                top: 0;
                left: -100%;
                right: -100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
                animation: scanLine 2s linear infinite;
              }
              @keyframes scanLine {
                0% { left: -100%; }
                100% { left: 200%; }
              }
            `}</style>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
