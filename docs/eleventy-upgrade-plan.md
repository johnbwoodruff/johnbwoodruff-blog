# Eleventy Upgrade Plan: 0.12.1 → 3.1.2

You're **very** behind - jumping from v0.12.1 (April 2021) to v3.1.2 (December 2024) spans 3+ years and 3 major versions.

## Current vs Latest Versions
- **Eleventy**: 0.12.1 → 3.1.2 (massive jump)
- **Navigation Plugin**: 0.1.6 → 1.0.4 ✅
- **RSS Plugin**: 1.1.1 → 2.0.4 
- **Syntax Highlight**: 3.1.0 → 5.0.2
- **FontAwesome Plugin**: 1.0.2 → 1.1.0 ✅

## Migration Strategy (Multi-Phase Approach)

### Phase 1: Pre-Migration Preparation
1. **Backup everything** (create git branch)
2. **Test current build** to ensure it works
3. **Node.js check** - You have Node 22 ✅ (required for v3+)

### Phase 2: Incremental Upgrade (Recommended)
Due to the massive version gap, consider upgrading incrementally:

1. **0.12.1 → 1.0** (test compatibility)
2. **1.0 → 2.0** (test compatibility) 
3. **2.0 → 3.1.2** (major ESM conversion)

### Phase 3: Direct Upgrade to 3.1.2 (Alternative)

#### Step 1: Install Upgrade Helper
```bash
npm install @11ty/eleventy-upgrade-help@3
npm install @11ty/eleventy@3
```

#### Step 2: Convert to ESM
**Critical**: Eleventy 3.0 requires ESM modules
- Add `"type": "module"` to package.json
- Convert `.eleventy.js` → `.eleventy.js` with ES6 imports
- Change all `require()` → `import` statements
- Change `module.exports` → `export default`

#### Step 3: Update Dependencies
```bash
npm install @11ty/eleventy@^3.1.2
npm install @11ty/eleventy-navigation@^1.0.4
npm install @11ty/eleventy-plugin-rss@^2.0.4
npm install @11ty/eleventy-plugin-syntaxhighlight@^5.0.2
npm install @vidhill/fortawesome-brands-11ty-shortcode@^1.1.0
```

#### Step 4: Configuration Updates
- **Filter changes**: `slug` filter removed (use `slugify`)
- **Plugin API changes**: Some plugin initialization may differ
- **Template changes**: Verify Nunjucks compatibility

#### Step 5: Test & Fix
- Run upgrade helper to identify issues
- Test build process
- Check all pages render correctly
- Verify RSS feeds and navigation

## Risks & Considerations
- **Breaking changes**: Multiple major version jumps = high risk
- **ESM conversion**: Most complex part of upgrade
- **Plugin compatibility**: Some plugins may need updates
- **Template syntax**: Potential Nunjucks template issues
- **Time investment**: Plan for several hours of work

## Recommendation
Start with **Phase 2 (incremental)** for safety, or backup everything and attempt **Phase 3 (direct)** if you're comfortable with potential debugging time.