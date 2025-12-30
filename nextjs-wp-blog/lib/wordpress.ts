import { BlogPost, BlogPostDetail, Category, FeaturedImage } from '../types/blog';

const WP_API_BASE = process.env.NEXT_PUBLIC_WP_API_URL
  ? process.env.NEXT_PUBLIC_WP_API_URL.replace(/\/+$/g, '')
  : '';

export async function wpFetch<T>(endpoint: string): Promise<T> {
  if (!endpoint || !endpoint.startsWith('/')) {
    throw new Error('wpFetch: endpoint must start with "/" (e.g. "/posts?_embed").');
  }

  if (!WP_API_BASE) {
    throw new Error('NEXT_PUBLIC_WP_API_URL environment variable is not set');
  }

  const url = WP_API_BASE + endpoint;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) {
      const body = await res.text().catch(() => res.statusText);
      throw new Error(`WP API request failed: ${res.status} ${body}`);
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`WordPress API error for ${endpoint}:`, error);
    throw error;
  }
}

function mapFeaturedImageFromEmbedded(post: any): FeaturedImage | null {
  const media = post?._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;
  return {
    id: media.id ?? 0,
    src: media.source_url || media.media_details?.sizes?.full?.source_url || '',
    alt: media.alt_text || null,
  };
}

function mapFeaturedImageSimple(post: any): { src: string; alt?: string } | undefined {
  const media = post?._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return undefined;
  return {
    src: media.source_url || media.media_details?.sizes?.full?.source_url || '',
    alt: media.alt_text || undefined,
  };
}

function mapCategoriesFromEmbedded(post: any): { id: number; name: string }[] {
  const termGroups = post?._embedded?.['wp:term'] ?? [];
  const flat = Array.isArray(termGroups) ? termGroups.flat() : [];
  return (flat || [])
    .filter((t: any) => t && t.taxonomy === 'category')
    .map((c: any) => ({ id: c.id, name: c.name }));
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const data = await wpFetch<any[]>('/posts?_embed');

    return data.map((post) => {
      const categories: number[] = Array.isArray(post.categories)
        ? post.categories.map((c: any) => Number(c)).filter(Boolean)
        : [];

      return {
        id: post.id,
        slug: post.slug,
        title: post.title?.rendered ?? post.title ?? '',
        excerpt: post.excerpt?.rendered ?? post.excerpt ?? '',
        date: post.date,
        featuredImage: mapFeaturedImageFromEmbedded(post),
        categories,
      } as BlogPost;
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  if (!slug) return null;

  try {
    const encoded = encodeURIComponent(slug);
    const data = await wpFetch<any[]>(`/posts?slug=${encoded}&_embed`);
    const post = data?.[0];
    if (!post) return null;

    const categories: number[] = Array.isArray(post.categories)
      ? post.categories.map((c: any) => Number(c)).filter(Boolean)
      : [];

    const authorName = post._embedded?.author?.[0]?.name || post.author?.name || 'Unknown';

    // Map categories to {id, name} when embedded; otherwise fallback to ids
    const detailedCategories = mapCategoriesFromEmbedded(post);
    const finalCategories = detailedCategories.length > 0 ? detailedCategories : (categories.map((id) => ({ id, name: '' })));

    return {
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered ?? post.title ?? '',
      excerpt: post.excerpt?.rendered ?? post.excerpt ?? '',
      date: post.date,
      content: post.content?.rendered ?? post.content ?? '',
      author: authorName,
      featuredImage: mapFeaturedImageSimple(post),
      categories: finalCategories,
    } as BlogPostDetail;
  } catch (error) {
    console.error(`Error fetching post by slug ${slug}:`, error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await wpFetch<any[]>('/categories');
    return Array.isArray(data)
      ? data.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))
      : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
