export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface FeaturedImage {
  id: number;
  src: string;
  alt: string | null;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  featuredImage: FeaturedImage | null;
  categories: number[];
}

export interface BlogPostDetail extends BlogPost {
  content: string;
  author: string;
  categories: { id: number; name: string }[];
  featuredImage?: { src: string; alt?: string };
}
