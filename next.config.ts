import type { NextConfig } from "next";
import { withContentlayer } from 'next-contentlayer';

const nextConfig: NextConfig = {
  // GitHub Pages 部署到子路径，需要配置 basePath
  basePath: '/blog',
  // GitHub Pages 不支持 Next.js Image Optimization，需要禁用
  images: {
    unoptimized: true,
  },
};

export default withContentlayer(nextConfig, {
  // 禁用 Turbopack，Contentlayer 需要 Webpack
  turbopack: false,
  // 启用静态导出用于 GitHub Pages
  output: 'export',
});
