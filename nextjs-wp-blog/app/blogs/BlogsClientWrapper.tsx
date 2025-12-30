'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BlogPost } from '@/types/blog';
import BlogCard from '@/components/BlogCard';
import CategoryFilter from '@/components/CategoryFilter';

interface BlogsClientWrapperProps {
  posts: BlogPost[];
}

export default function BlogsClientWrapper({ posts }: BlogsClientWrapperProps) {
  const selectedCategory = useSelector(
    (state: any) => state.category.selectedCategory
  );

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;

    return posts.filter((post) => post.categories.includes(selectedCategory));
  }, [posts, selectedCategory]);

  return (
    <>
      <CategoryFilter />

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {selectedCategory
              ? 'No posts found in this category.'
              : 'No posts available.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
