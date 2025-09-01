# Astro Migration Plan: Eleventy → Astro 5.0

Complete migration strategy to rebuild the John Woodruff blog using Astro **within a new git branch** while maintaining all existing paths, pages, posts, and styles.

## Why Migrate to Astro?

- **Performance**: Islands architecture with 90% less JavaScript
- **Modern DX**: Built-in TypeScript, asset bundling, and hot reloading
- **Content Collections**: Type-safe content management with validation
- **Future-proof**: Active development with Astro 5.0 features
- **No Eleventy upgrade pain**: Skip the complex 0.12→3.x migration

## Branch-Based Migration Strategy

This migration will happen in a dedicated `astro-migration` branch, allowing you to:
- Work incrementally over time without affecting the live site
- Switch between branches to compare implementations
- Merge only when fully tested and ready
- Maintain the existing Eleventy site on `main` branch

## Current Site Analysis

### Existing Structure (to be preserved)
- **Posts**: ~20 Markdown blog posts in `/posts/` with frontmatter
- **Templates**: Nunjucks layouts (`base.njk`, `home.njk`, `post.njk`)
- **Navigation**: Eleventy Navigation plugin with manual config
- **Styles**: Individual CSS files per page (index.css, post.css, etc.)
- **Assets**: Images, favicons, and static assets
- **Features**: RSS feeds, syntax highlighting, Google Analytics

### Content Inventory
- Homepage with posts list
- Individual blog posts with tags
- About page, Projects page
- RSS/JSON feeds
- 404 page

## Migration Strategy

### Phase 0: Branch Setup

#### 0.1 Create Migration Branch
```bash
git checkout -b astro-migration
git push -u origin astro-migration
```

#### 0.2 Clean Slate Preparation
```bash
# Remove Eleventy-specific files (keep content and assets)
rm -rf _site node_modules package-lock.json
rm .eleventy.js .eleventyignore
rm -rf _includes _data

# Keep: posts/, css/, img/, about/, projects/, favicons, README.md
```

#### 0.3 Initialize Astro in Current Directory
```bash
# Initialize Astro with manual setup (not npm create)
npm init -y
npm install astro @astrojs/check @astrojs/rss @astrojs/sitemap typescript
npx astro add mdx sitemap
```

### Phase 1: Project Structure Setup

#### 1.1 Create Astro Directory Structure
```bash
mkdir -p src/{components,content,layouts,pages,styles}
mkdir -p src/content/blog
mkdir -p public
```

#### 1.2 Move Existing Assets
```bash
# Move static assets to public/
mv css/ img/ *.png *.ico site.webmanifest public/

# Content will be migrated to src/content/blog/ in Phase 2
```

#### 1.3 Update package.json
Replace scripts with:
```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

#### 1.4 Create Astro Config
Create `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://johnbwoodruff.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'monokai'
    }
  }
});
```

### Phase 2: Content Migration

#### 2.1 Content Collections Setup
Create `src/content/config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    published: z.boolean().default(true),
    tags: z.array(z.string()),
    cover_image: z.string().optional(),
  }),
});

export const collections = { blog };
```

#### 2.2 Migrate Blog Posts
```bash
# Move posts to Astro content collections
cp -r posts/* src/content/blog/
# Rename .md files to match slug format if needed
# Verify frontmatter compatibility (minimal changes needed)
```

#### 2.3 Global Data Migration
Create `src/config.ts` from existing `_data/metadata.json`:
```typescript
export const SITE = {
  title: 'John Woodruff',
  description: 'This is the home for my portfolio as well as my musings on tech and the world.',
  url: 'https://johnbwoodruff.com',
  author: {
    name: 'John Woodruff',
    email: 'johnwoodruff91@gmail.com',
    url: 'https://johnbwoodruff.com/about/'
  }
};
```

#### 2.4 Migrate Static Pages
```bash
# Convert existing pages to Astro format
# about/index.md → src/pages/about.astro (or about/index.astro)  
# projects/index.njk → src/pages/projects.astro
# 404.njk → src/pages/404.astro
```

### Phase 3: Layout & Template Migration

#### 3.1 Base Layout (`src/layouts/BaseLayout.astro`)
Convert `_includes/layouts/base.njk` to Astro:
```astro
---
export interface Props {
  title?: string;
  description?: string;
  class?: string;
}

const { title, description, class: templateClass } = Astro.props;
import { SITE } from '../config';
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>{title || SITE.title}</title>
    <meta name="description" content={description || SITE.description} />
    
    <!-- Favicon assets -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <!-- ... other favicons -->
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="/css/index.css" />
    <!-- ... other CSS files -->
  </head>
  <body>
    <header class="main-header">
      <h1 class="home">
        <a href="/">{SITE.title}</a>
      </h1>
      <nav>
        <!-- Navigation component -->
      </nav>
    </header>
    
    <main class={templateClass}>
      <slot />
    </main>
    
    <footer class="main-footer">
      <small>Copyright © {new Date().getFullYear()} • John Woodruff</small>
    </footer>
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-46243905-9"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'UA-46243905-9');
    </script>
  </body>
</html>
```

#### 3.2 Blog Post Layout (`src/layouts/PostLayout.astro`)
Convert post template with automatic date formatting and tag display.

#### 3.3 Home Page (`src/pages/index.astro`)
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => data.published);
const sortedPosts = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<BaseLayout title="Home">
  <div class="posts-list">
    {sortedPosts.map((post) => (
      <article>
        <h2><a href={`/posts/${post.slug}/`}>{post.data.title}</a></h2>
        <time>{post.data.date.toLocaleDateString()}</time>
        <p>{post.data.description}</p>
      </article>
    ))}
  </div>
</BaseLayout>
```

### Phase 4: Dynamic Pages & Features

#### 4.1 Blog Post Pages
Create `src/pages/posts/[...slug].astro` for dynamic post routing.

#### 4.2 Tag Pages
Create `src/pages/tags/[tag].astro` for tag-based post listing.

#### 4.3 RSS Feed (`src/pages/feed.xml.ts`)
```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

export async function GET() {
  const posts = await getCollection('blog');
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
  });
}
```

#### 4.4 Sitemap
Automatic generation via `@astrojs/sitemap` integration.

### Phase 5: Asset & Style Migration

#### 5.1 Static Assets
- Move `img/`, `css/`, favicons to `public/`
- Maintain exact same paths for SEO

#### 5.2 CSS Strategy
**Option A: Keep existing CSS structure**
- Import CSS files in layouts as needed
- Minimal changes to existing styles

**Option B: Modernize with CSS Modules/Styled Components**
- Refactor to component-scoped styles
- Better maintainability but more work

#### 5.3 Syntax Highlighting
Configure Shiki (built into Astro) to match current Prism theme.

### Phase 6: Path Preservation & SEO

#### 6.1 URL Structure
Ensure exact path matching:
- `/posts/post-slug/` (same as current)
- `/about/` → `/about/`
- `/projects/` → `/projects/`
- `/feed/feed.xml` → `/feed.xml`

#### 6.2 Meta Tags & SEO
- Preserve all existing meta tags
- Maintain Google Analytics setup
- Keep same JSON-LD structured data

### Phase 7: Development & Deployment

#### 7.1 Development Setup
```bash
npm run dev    # Development server
npm run build  # Production build
npm run preview # Preview production build
```

#### 7.2 Netlify Deployment
Update `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/feed/feed.xml"
  to = "/feed.xml"
  status = 301
```

## Branch-Based Migration Timeline

### Setup Phase (1-2 hours)
- **Day 1**: Create `astro-migration` branch and initialize Astro structure
- **Benefit**: Can switch back to `main` anytime to check current site

### Incremental Development (Work at your own pace)
- **Phase 1**: Content collections and basic pages (weekend project)
- **Phase 2**: Layout conversion and styling (another weekend)  
- **Phase 3**: Advanced features and RSS feeds (final weekend)
- **Phase 4**: Testing and refinement (ongoing)

### Merge Strategy
- **When ready**: Merge `astro-migration` → `main` 
- **Rollback option**: Keep `main` branch as backup until confident
- **Deployment**: Update Netlify build command when merging

## Advantages of This Migration

1. **Performance**: Faster loading with islands architecture
2. **DX**: Modern tooling with TypeScript and hot reload
3. **Maintenance**: No complex Eleventy upgrade needed
4. **Future-proof**: Active development and community
5. **Type Safety**: Content collections with validation
6. **Built-in Features**: Asset bundling, image optimization

## Risks & Mitigation

- **Time Investment**: ~2-4 weeks of development time
- **Learning Curve**: Astro syntax (but similar to React/Vue)
- **Plugin Ecosystem**: May need to find Astro alternatives for some Eleventy plugins
- **SEO**: Thorough testing required to maintain search rankings

## Branch-Based Development Benefits

1. **Safe Experimentation**: Work on Astro without breaking the live site
2. **Easy Comparison**: `git checkout main` to see current site anytime
3. **Incremental Progress**: Commit progress and return to it later
4. **Risk-Free**: Can abandon migration without any impact
5. **Flexible Timeline**: No pressure to complete in one session

## Getting Started Commands

```bash
# Start the migration
git checkout -b astro-migration
git push -u origin astro-migration

# Work on migration...
# [Follow phases above]

# Test your progress
npm run dev  # Astro dev server

# Switch back to current site anytime
git checkout main
npm start    # Eleventy dev server

# When ready to deploy
git checkout main
git merge astro-migration
git push origin main
```

## Success Criteria

- [ ] All existing URLs work (301 redirects where needed)
- [ ] RSS feeds functional  
- [ ] Google Analytics tracking preserved
- [ ] Same visual design and layout
- [ ] Faster page load speeds
- [ ] All blog posts render correctly
- [ ] Easy branch switching between old/new implementations
- [ ] Clean migration without breaking main branch