export interface Category {
  id: number;
  name: string;
  slug: string;
}

// Canonical featured image shape returned by the WordPress API embedding
export interface FeaturedImage {
  id?: number;
  src: string;
  alt?: string | null;
}

// Allow either numeric category IDs or full category objects in API shapes
export type CategoryRef = number | { id: number; name: string };

// Images returned by helper functions may be a simplified shape or the full FeaturedImage
export type ImageLike = FeaturedImage | { src: string; alt?: string } | null | undefined;

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  // optional because some fetch helpers return undefined when no image exists
  featuredImage?: ImageLike;
  // may contain numeric IDs (listing) or full objects (detail)
  categories: CategoryRef[];
}

export interface BlogPostDetail extends BlogPost {
  content: string;
  author: string;
  // detail pages present categories as full objects
  categories: { id: number; name: string }[];
}
