# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal technical blog built with Next.js, featuring interactive 3D particle background effects using Three.js/React Three Fiber. Content is managed through MDX files and processed by Contentlayer for type-safe content transformation.

**Tech Stack:** Next.js 15, React 18, TypeScript, Three.js, React Three Fiber, Contentlayer, MDX, Tailwind CSS 4, Framer Motion

## Development Commands

```bash
# Start development server (must use --webpack flag, Turbopack is incompatible with Contentlayer)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

**Important:** This project requires Webpack (not Turbopack) due to Contentloader integration. The `dev` script includes the `--webpack` flag to enforce this.

## Architecture

### Content-Driven Design with Contentlayer

The blog follows a content-first architecture where all posts are MDX files in `src/content/blog/`. Contentlayer transforms these into TypeScript types available via `.contentlayer/generated`.

**Post Schema (defined in `contentlayer.config.ts`):**
- Required fields: `title`, `description`, `date`
- Optional fields: `tags` (array), `image`
- Computed fields: `slug`, `url` (auto-generated from filename)

**MDX Processing Pipeline:**
- `rehype-slug` - Generates heading IDs for anchor links
- `rehype-autolink-headings` - Auto-links headings with copy-on-click
- `rehype-pretty-code` - Syntax highlighting with GitHub Dark theme

### Client/Server Component Split

This is a Next.js App Router project with careful separation between server and client components:

**Server Components:** Pages (`app/**/*.tsx`) that fetch and render content
**Client Components:** Interactive elements (marked with `'use client'`)
- `Canvas.tsx` and `ParticleBackground.tsx` - 3D graphics
- Components using Framer Motion animations
- `MDXContent.tsx` - MDX rendering

### 3D Graphics Integration

The 3D particle background is implemented with:
- `src/components/3d/Canvas.tsx` - Dynamic wrapper with `ssr: false` (prevents SSR issues with Three.js)
- `src/components/3d/ParticleBackground.tsx` - Three.js scene using React Three Fiber
- Particle count adapts: 5000 on desktop, 2000 on mobile (performance optimization)
- Includes resize listener to dynamically adjust particle count when window size changes

### Error Handling

- `src/components/layout/ErrorBoundary.tsx` - Error boundary wrapper for 3D components to prevent crashes from breaking the entire page
- Canvas component is wrapped with ErrorBoundary and Suspense for graceful degradation

### Styling System

- **Tailwind CSS 4** with inline theme configuration (no `tailwind.config.js`)
- CSS Custom Properties for theming in `src/app/globals.css`
- Dark theme with blue/purple aurora gradient animation
- Prose styles for blog content typography

## Creating a New Blog Post

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter:

```yaml
---
title: 'Post Title'
description: 'Post description'
date: 2024-01-15
tags: ['tag1', 'tag2']
image: '/path/to/image.jpg' # optional
---
```

3. Write MDX content (Markdown + JSX)
4. Contentlayer auto-generates types - post appears at `/blog/[filename-without-extension]`

## Key Configuration Files

- `contentlayer.config.ts` - Content schema and MDX processing pipeline
- `next.config.ts` - Wrapped with `withContentlayer`, Turbopack disabled
- `tsconfig.json` - Path alias: `@/*` maps to `./src/*`
- `postcss.config.mjs` - Tailwind CSS PostCSS plugin

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Canvas, Header, Footer)
│   ├── page.tsx            # Homepage
│   ├── about/
│   └── blog/
│       ├── page.tsx        # Blog listing
│       └── [slug]/page.tsx # Individual post
├── components/
│   ├── 3d/                 # Three.js components
│   ├── blog/               # Blog-specific components
│   └── layout/             # Header, Footer
├── content/blog/           # MDX blog posts
└── lib/utils.ts            # Utilities (cn, formatDate)
```

## Important Notes

- **Do not enable Turbopack** - Contentlayer requires Webpack
- **3D components must disable SSR** - Use `dynamic(import(), { ssr: false })`
- **Import content from `.contentlayer/generated`** - Types are auto-generated
- **Path alias `@/*`** - Prefer over relative imports
