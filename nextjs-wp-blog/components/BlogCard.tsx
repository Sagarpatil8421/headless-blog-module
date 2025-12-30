'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { useEffect, useState, memo } from 'react';
import { getCategories } from '@/lib/wordpress';
import he from "he";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = memo(function BlogCard({ post }: BlogCardProps) {
  const [categoryNames, setCategoryNames] = useState<Record<number, string>>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const cats = await getCategories();
        if (!mounted) return;
        const map: Record<number, string> = {};
        cats.forEach((c) => (map[c.id] = c.name));
        setCategoryNames(map);
      } catch (err) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const excerptHtml = post.excerpt.substring(0, 250);

  return (
    <article className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.featuredImage && (
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="flex flex-col flex-grow p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {he.decode(post.title)}
        </h2>

        <div
          className="text-gray-600 text-sm mb-3 line-clamp-3 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: excerptHtml }}
        />

        {post.categories && post.categories.length > 0 && (() => {
          // Normalize categories to numeric IDs when the array may contain objects
          const categoryIds: number[] = post.categories
            .map((c) => {
              if (typeof c === 'number') return c;
              if (c && typeof c === 'object' && 'id' in c) return (c as { id: number }).id;
              return undefined;
            })
            .filter((n): n is number => typeof n === 'number');

          return (
            <div className="flex flex-wrap gap-2 mb-3">
              {categoryIds.map((id) => (
                <span
                  key={id}
                  className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {categoryNames[id] ?? 'Category'}
                </span>
              ))}
            </div>
          );
        })()}

        <div className="mt-auto pt-3 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <Link
            href={`/blogs/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
});

export default BlogCard;
