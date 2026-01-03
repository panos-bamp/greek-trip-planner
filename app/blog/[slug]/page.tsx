import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { portableTextComponents } from '@/components/portableTextComponents';
import Link from 'next/link';

interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  body: any[];
  author?: {
    name: string;
    image?: string;
  };
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  categories?: Array<{
    title: string;
    slug: { current: string };
  }>;
}

export async function generateStaticParams() {
  const posts = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "post"]{ slug }`
  );

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch<Post>(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        slug,
        publishedAt,
        excerpt,
        body,
        author->{
          name,
          image
        },
        mainImage{
          asset->{
            url
          },
          alt
        },
        categories[]->{
          title,
          slug
        }
      }`,
      { slug }
    );

    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Greek Trip Planner Blog`,
    description: post.excerpt || `Read ${post.title} on the Greek Trip Planner blog`,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Featured Image */}
      {post.mainImage?.asset?.url && (
        <div className="w-full bg-gray-100">
          <div className="max-w-[70rem] mx-auto px-6 py-12">
            <img
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || post.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Main Content - GetYourGuide width: 70rem (1120px) */}
      <article className="max-w-[70rem] mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <Link
                  key={category.slug.current}
                  href={`/blog/category/${category.slug.current}`}
                  className="inline-block bg-accent-pink text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          {/* Title - GetYourGuide uses H2 size (38px) for blog titles */}
          <h1 className="text-[2.375rem] font-bold text-primary mb-6 leading-[1.1]">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-gray-600 text-base">
            {post.author?.name && (
              <div className="flex items-center gap-3">
                {post.author.image && (
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <span className="font-medium">{post.author.name}</span>
              </div>
            )}
            <time dateTime={post.publishedAt} className="text-gray-500">
              {formattedDate}
            </time>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Divider */}
        <hr className="border-t-2 border-gray-200 mb-12" />

        {/* Blog Content with PortableText */}
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>

        {/* Author Bio */}
        {post.author && (
          <div className="mt-16 pt-8 border-t-2 border-gray-200">
            <div className="flex items-start gap-6">
              {post.author.image && (
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  About {post.author.name}
                </h3>
                <p className="text-gray-600">
                  Travel expert and content creator at Greek Trip Planner.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-pink transition-all transform hover:scale-105"
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
