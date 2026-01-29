import { withContentlayer } from 'next-contentlayer';

// GitHub Pages 部署时需要 basePath，本地开发不需要
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/blog' : '';

export default withContentlayer({
  // GitHub Pages 部署到子路径时配置 basePath
  basePath,
  // GitHub Pages 不支持 Next.js Image Optimization，需要禁用
  images: {
    unoptimized: true,
  },
  // 启用静态导出用于 GitHub Pages
  output: 'export',
  // 禁用 React 严格模式以避免兼容性问题
  reactStrictMode: false,
});
