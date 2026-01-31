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
  // React Strict Mode 暂时禁用 - Contentlayer MDX 组件在严格模式下有兼容性问题
  // 这是一个已知问题，等待 Contentlayer 迁移到 Content Collections 后解决
  reactStrictMode: false,
});
