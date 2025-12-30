# SEO-Friendly Blog Module using Next.js & Headless WordPress

A modern, high-performance blog application built with Next.js 14 and Headless WordPress. Features server-side rendering, incremental static regeneration (ISR), dynamic meta tags, category-based filtering, and responsive design with Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: React 18 + TypeScript
- **CMS**: Headless WordPress (REST API)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Handling**: Formik + Yup validation
- **Notifications**: React Toastify
- **Image Optimization**: next/image with responsive sizing

## Features

✨ **Performance & SEO**
- Incremental Static Regeneration (ISR) with 5-minute revalidation
- Static page generation with `generateStaticParams()`
- Dynamic meta tags for blog listing and detail pages
- OpenGraph support for social sharing
- Responsive image optimization with `next/image`

✨ **Blog Features**
- Blog listing page with category-based filtering
- Dynamic blog detail pages with automatic routing
- Skeleton loaders for improved UX during data fetching
- Server-side data fetching with error handling
- Memoized components to prevent unnecessary re-renders

✨ **User Experience**
- Hero section on homepage with CTA buttons
- Latest 3 blog posts on homepage
- Category filter with Redux state management
- Contact form with validation and toast notifications
- Fully responsive design for mobile, tablet, and desktop

✨ **Developer Experience**
- TypeScript for type safety
- Structured folder organization
- Error handling and fallback UI
- Environment variable configuration
- Production-optimized build

## Folder Structure

```
nextjs-wp-blog/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles
│   └── blogs/
│       ├── page.tsx              # Blog listing page
│       ├── [slug]/
│       │   └── page.tsx          # Blog detail page
│       └── BlogsClientWrapper.tsx # Client-side filtering
├── components/                   # Reusable React components
│   ├── BlogCard.tsx              # Blog card (memoized)
│   ├── BlogListSkeleton.tsx      # Skeleton loader for list
│   ├── BlogDetailSkeleton.tsx    # Skeleton loader for detail
│   ├── CategoryFilter.tsx        # Category filter component
│   └── ContactForm.tsx           # Contact form
├── lib/                          # Utility functions
│   └── wordpress.ts              # WordPress API integration
├── store/                        # Redux store
│   ├── store.ts                  # Store configuration
│   └── categorySlice.ts          # Category reducer
├── types/                        # TypeScript types
│   └── blog.ts                   # Blog-related interfaces
└── public/                       # Static assets
```

## Setup Instructions

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository** (or extract the project)
   ```bash
   cd nextjs-wp-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_WP_API_URL` | WordPress REST API endpoint | `https://example.com/wp-json/wp/v2` |

**Note**: The `NEXT_PUBLIC_` prefix makes this variable accessible in the browser. Keep API keys and private URLs in non-public variables.

## Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in the Vercel dashboard
4. Click Deploy

[Learn more about deploying Next.js on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)

### Other Deployment Options

- **Netlify**: Export as static site with `next export`
- **Docker**: Containerize with Dockerfile
- **Self-hosted**: Deploy to any Node.js server

## Project Highlights

🚀 **Performance Optimized**
- Server-side rendering for fast initial load
- ISR for automatic content updates
- Image optimization with responsive sizing
- Memoized components to reduce re-renders

🔍 **SEO Ready**
- Dynamic meta tags for each page
- OpenGraph support for social sharing
- Structured semantic HTML
- XML sitemap support (with `next-sitemap`)

🎨 **User-Centric Design**
- Skeleton loaders for perceived performance
- Toast notifications for user feedback
- Responsive Tailwind design
- Accessible form inputs and navigation

🛠️ **Developer-Friendly**
- TypeScript for type safety
- Clean code organization
- Comprehensive error handling
- Easy WordPress integration

## Notes

- **Contact Form**: Currently uses mock API. Connect to a real backend for email functionality
- **WordPress Integration**: Fetches posts from WordPress REST API with error handling and caching
- **Category System**: Uses Redux for client-side state management of category filters
- **Image Handling**: All images optimized using Next.js `Image` component with responsive sizing

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues or questions, refer to the [Next.js documentation](https://nextjs.org/docs) or [WordPress REST API docs](https://developer.wordpress.org/rest-api/).
