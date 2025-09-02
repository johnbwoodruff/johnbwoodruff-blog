# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website and blog built with **Astro**, a modern static site generator. The site is deployed to Netlify and focuses on content creation through markdown blog posts.

## Development Commands

- `npm run dev` or `npm start` - Start development server with live reload on port 4321
- `npm run build` - Production build (generates static files to `dist/`)
- `npm run preview` - Preview the built site locally
- `npm run astro` - Run Astro CLI commands

## Architecture

### Key Files
- `astro.config.mjs` - Main Astro configuration file containing integrations and build settings
- `package.json` - Defines build scripts and dependencies (uses Astro v5.13.5)
- `netlify.toml` - Deployment configuration for Netlify hosting

### Directory Structure
- `src/` - Source code directory
  - `src/pages/` - Page routes and components (uses file-based routing)
  - `src/layouts/` - Layout components for pages
  - `src/components/` - Reusable Astro components
  - `src/content/` - Content collections (blog posts, etc.)
  - `src/styles/` - Stylesheets and CSS files
- `public/` - Static assets (images, favicon, etc.)
- `posts/` - Legacy blog posts directory (may need migration)
- `dist/` - Generated static site output (build target)

### Template Engine
- Uses **Astro components** (.astro) as the primary templating system
- Supports MDX for enhanced markdown with components
- Content collections for type-safe content management
- File-based routing in `src/pages/`

### Content Management
- Blog posts can be in `src/content/` collections or `posts/` directory
- Uses front matter for post metadata (date, title, tags, etc.)
- Automatic content collection generation via Astro's content API
- Built-in content validation and TypeScript support

### Plugins & Features
- **RSS feed generation** via `@astrojs/rss`
- **Syntax highlighting** via Shiki (built-in, configured with Monokai theme)
- **Sitemap generation** via `@astrojs/sitemap`
- **MDX support** via `@astrojs/mdx`
- **TypeScript support** with `@astrojs/check`

## Node Version
Uses Node.js version specified in `.nvmrc` file.