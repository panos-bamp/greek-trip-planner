import Link from 'next/link';
import { client } from '@/sanity/lib/client';

interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  author?: {
    name: string;
  };
}

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch<Post[]>(
      `*[_type == "post"] | order(publishedAt desc) {
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage{
          asset->{
            url
          },
          alt
        },
        author->{
          name
        }
      }`
    );
    return posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-[70rem] mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Greek Trip Planner Blog</h1>
          <p className="text-xl text-gray-100 max-w-2xl">
            Discover travel tips, destination guides, and insider secrets for your perfect Greek adventure.
          </p>
        </div>
      </section>

      {/* Main Content - GetYourGuide width: 70rem (1120px) */}
      <main className="max-w-[70rem] mx-auto px-6 py-16">
        {posts.length === 0 ? (
          // No posts yet
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center mb-16">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Blog Posts Coming Soon!
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              We're working hard to bring you amazing travel content. 
              In the meantime, start planning your Greek adventure with our AI Trip Planner!
            </p>
            <Link
              href="/quiz"
              className="inline-block bg-accent-pink text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary transition-all transform hover:scale-105"
            >
              Start Planning Your Trip →
            </Link>
          </div>
        ) : (
          // Blog posts grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {posts.map((post) => {
              // FIX: Handle invalid dates properly
              let formattedDate = 'Recently published';
              
              try {
                const date = new Date(post.publishedAt);
                // Check if date is valid (not epoch time)
                if (date.getFullYear() > 2000) {
                  formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                }
              } catch (error) {
                console.error('Error parsing date:', error);
              }

              return (
                <Link
                  key={post.slug.current}
                  href={`/blog/${post.slug.current}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  {/* Featured Image */}
                  {post.mainImage?.asset?.url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt || post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-primary mb-3 group-hover:text-accent-pink transition-colors">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      {post.author?.name && (
                        <span>{post.author.name}</span>
                      )}
                      <time dateTime={post.publishedAt}>{formattedDate}</time>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Travel Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Helpful Travel Resources
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Destination Guides
              </h3>
              <p className="text-gray-600 mb-4">
                Comprehensive guides to Greece's most popular destinations and hidden gems.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Travel Tips
              </h3>
              <p className="text-gray-600 mb-4">
                Expert advice on traveling in Greece, from local customs to money-saving tips.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Food & Culture
              </h3>
              <p className="text-gray-600 mb-4">
                Discover authentic Greek cuisine and cultural experiences you can't miss.
              </p>
            </div>
          </div>
        </section>

        {/* External Resources */}
        <section className="bg-gradient-to-r from-accent-blue to-primary text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Planning Your Greek Adventure?
          </h2>
          <p className="text-xl text-center mb-8 max-w-2xl mx-auto">
            Use our AI-powered trip planner to create your perfect Greek itinerary in minutes!
          </p>
          <div className="text-center">
            <Link
              href="/quiz"
              className="inline-block bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Start Planning Now →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
