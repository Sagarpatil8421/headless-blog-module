import Link from 'next/link';
import { getPosts } from '@/lib/wordpress';
import BlogCard from '@/components/BlogCard';

export default async function Home() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to Our Blog
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover insightful articles on web development, technology trends, and best practices to enhance your skills
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blogs"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              View Blogs
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-600">
              Stay updated with our most recent posts
            </p>
          </div>

          {latestPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {latestPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/blogs"
                  className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  View All Articles
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles available yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
