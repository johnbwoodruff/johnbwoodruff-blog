# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website and blog built with **Eleventy** (11ty), a static site generator. The site is deployed to Netlify and focuses on content creation through markdown blog posts.

## Development Commands

- `npm start` or `npm run serve` - Start development server with live reload on port 3000
- `npm run watch` - Build and watch for changes with live reload on port 3000
- `npm run build` or `npm build` - Production build (generates static files to `_site/`)
- `npm run debug` - Run with debug output enabled

## Architecture

### Key Files
- `.eleventy.js` - Main Eleventy configuration file containing plugins, filters, collections, and build settings
- `package.json` - Defines build scripts and dependencies (uses Eleventy v0.12.1)
- `netlify.toml` - Deployment configuration for Netlify hosting

### Directory Structure
- `_includes/` - Nunjucks templates and layouts (e.g., `layouts/post.njk`, `layouts/home.njk`)
- `_data/` - Global data files for site configuration
- `posts/` - Blog posts written in Markdown
- `css/` - Stylesheets (copied to output via passthrough)
- `img/` - Images and media assets (copied to output via passthrough)
- `_site/` - Generated static site output (build target)

### Template Engine
- Uses **Nunjucks** (.njk) as the primary templating engine
- Markdown files are processed with Nunjucks preprocessing
- Layout alias: `layout: post` maps to `layouts/post.njk`

### Content Management
- Blog posts are Markdown files in the `posts/` directory
- Uses front matter for post metadata (date, title, tags, etc.)
- Automatic tag collection generation via `tagList` collection
- Date formatting with Luxon library (`readableDate` and `htmlDateString` filters)

### Plugins & Features
- **RSS feed generation** via `@11ty/eleventy-plugin-rss`
- **Syntax highlighting** for code blocks via `@11ty/eleventy-plugin-syntaxhighlight`
- **Navigation** via `@11ty/eleventy-navigation`
- **FontAwesome brand icons** via shortcode plugin
- **Markdown processing** with anchor links and HTML support
- **Development server** with 404 handling and BrowserSync integration

## Node Version
Uses Node.js version specified in `.nvmrc` file.