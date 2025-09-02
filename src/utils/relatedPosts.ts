import type { CollectionEntry } from 'astro:content';

export function getRelatedPosts(
  currentPost: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
  limit: number = 2
): CollectionEntry<'blog'>[] {
  const currentTags = currentPost.data.tags || [];

  if (currentTags.length === 0) {
    // If current post has no tags, return most recent posts
    return allPosts
      .filter(post => post.slug !== currentPost.slug && post.data.published)
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .slice(0, limit);
  }

  // Calculate relevance score for each post
  const postsWithScore = allPosts
    .filter(post => post.slug !== currentPost.slug && post.data.published)
    .map(post => {
      const postTags = post.data.tags || [];
      const commonTags = currentTags.filter(tag => postTags.includes(tag));
      const score = commonTags.length;
      return { post, score };
    })
    .filter(({ score }) => score > 0) // Only include posts with common tags
    .sort((a, b) => {
      // Sort by score first, then by date
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.post.data.date.valueOf() - a.post.data.date.valueOf();
    });

  const relatedPosts = postsWithScore.slice(0, limit).map(({ post }) => post);

  // If we don't have enough related posts, fill with recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = allPosts
      .filter(
        post =>
          post.slug !== currentPost.slug &&
          post.data.published &&
          !relatedPosts.includes(post)
      )
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .slice(0, limit - relatedPosts.length);

    relatedPosts.push(...recentPosts);
  }

  return relatedPosts;
}
