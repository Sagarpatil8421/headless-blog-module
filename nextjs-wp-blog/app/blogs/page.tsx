import { Metadata } from 'next';
import { Suspense } from 'react';
import { getPosts } from '@/lib/wordpress';
import BlogsClientWrapper from './BlogsClientWrapper';
import BlogListSkeleton from '@/components/BlogListSkeleton';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blogs',
    description: 'Read latest articles on web development and technology',
  };
}

export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-lg text-gray-600">
            Discover our latest articles and insights
          </p>
        </div>

        <Suspense fallback={<BlogListSkeleton />}>
          <BlogsClientWrapper posts={posts} />
        </Suspense>
      </div>
    </main>
  );
}
