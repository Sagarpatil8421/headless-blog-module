import { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import he from "he";
import { getPostBySlug, getCategories, getPosts } from '@/lib/wordpress';
import BlogDetailSkeleton from '@/components/BlogDetailSkeleton';

export const revalidate = 300;

export async function generateStaticParams() {
	try {
		const posts = await getPosts();
		return posts.map((post) => ({
			slug: post.slug,
		}));
	} catch (error) {
		console.error('Error generating static params:', error);
		return [];
	}
}

function stripHtml(html = '') {
	return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPostBySlug(slug);
	if (!post) {
		return { title: 'Post not found' };
	}

	const description = stripHtml(post.content).substring(0, 150);
	return {
		title: post.title,
		description,
		openGraph: {
			title: post.title,
			description,
			type: 'article',
			images: post.featuredImage ? [{ url: post.featuredImage.src }] : [],
		},
	};
}

async function BlogDetailContent({ slug }: { slug: string }) {
	const post = await getPostBySlug(slug);
	if (!post) return notFound();

	// Normalize categories to ensure consistent { id, name } format
	let postCategories: { id: number; name: string }[] = [];
	
	if (post.categories && Array.isArray(post.categories) && post.categories.length > 0) {
		const firstCategory = post.categories[0];
		
		// Check if categories are already objects with id and name
		if (typeof firstCategory === 'object' && firstCategory !== null && 'name' in firstCategory) {
			postCategories = post.categories;
		} else if (typeof firstCategory === 'number') {
			// Categories are numeric IDs, fetch full category data
			const allCategories = await getCategories();
			const categoryIds = (post.categories as unknown as number[]);
			postCategories = allCategories.filter((c) => categoryIds.includes(c.id));
		}
	}

	return (
		<main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
			<article className="prose lg:prose-xl mx-auto">
				<header>
					<h1 className="text-3xl font-bold text-White-900">{he.decode(post.title)}</h1>
					<div className="mt-2 text-sm text-gray-500">
						<span>By {post.author ?? 'Unknown'}</span>
						<span className="mx-2">•</span>
						<time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
					</div>

					{post.featuredImage && (
						<div className="mt-6">
							<Image
								src={post.featuredImage.src}
								alt={post.featuredImage.alt ?? post.title}
								width={1200}
								height={700}
								className="w-full h-auto rounded"
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 800px"
								priority
							/>
						</div>
					)}

					{postCategories.length > 0 && (
						<ul className="mt-4 flex flex-wrap gap-2">
							{postCategories.map((c) => (
								<li
									key={c.id}
									className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
								>
									{c.name}
								</li>
							))}
						</ul>
					)}
				</header>

				<section className="mt-8" aria-label="Article content">
					<div dangerouslySetInnerHTML={{ __html: post.content }} />
				</section>
			</article>
		</main>
	);
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	return (
		<Suspense fallback={<BlogDetailSkeleton />}>
			<BlogDetailContent slug={slug} />
		</Suspense>
	);
}

