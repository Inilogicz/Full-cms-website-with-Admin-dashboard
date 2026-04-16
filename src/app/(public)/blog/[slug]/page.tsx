import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import BlogContent from '@/components/blog/BlogContent';

const defaultBlogPosts: Record<string, { title: string; content: string; category: string; publishedAt: Date }> = {
    'understanding-menstrual-hygiene': {
        title: 'Understanding Menstrual Hygiene: A Complete Guide',
        content: `<h2>The Importance of Menstrual Hygiene</h2><p>Menstrual hygiene management is a critical aspect of women's health that affects millions of women and girls in Nigeria. Proper hygiene during menstruation is essential for preventing infections, maintaining health, and preserving dignity.</p><h2>Best Practices</h2><p>Using quality sanitary products like LadySept sanitary towels ensures comfort and protection. Change pads regularly (every 4-6 hours), wash hands before and after handling sanitary products, and dispose of used products properly.</p><h2>Breaking Barriers</h2><p>Education and access to sanitary products are key to breaking the stigma around menstruation. Niger Sanitary Industry Limited is committed to making quality products accessible and affordable across Nigeria.</p>`,
        category: 'Menstrual Health',
        publishedAt: new Date('2024-01-15'),
    },
};

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    
    let post = defaultBlogPosts[slug];
    try {
        const dbPost = await prisma.blogPost.findUnique({ where: { slug } });
        if (dbPost) {
            post = {
                title: dbPost.title,
                content: dbPost.content,
                category: dbPost.category,
                publishedAt: dbPost.publishedAt || dbPost.createdAt,
            } as any;
        }
    } catch {}

    if (post) {
        const title = `${post.title} | Niger Sanitary Blog`;
        const description = post.content.replace(/<[^>]*>/g, '').substring(0, 160);
        const url = `https://nigersanitary.com/blog/${slug}`;

        return {
            title,
            description,
            alternates: {
                canonical: url,
            },
            openGraph: {
                title,
                description,
                url,
                type: 'article',
                publishedTime: post.publishedAt.toISOString(),
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
            },
        };
    }

    return { title: 'Blog Post' };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    let post: any = defaultBlogPosts[slug];

    try {
        const dbPost = await prisma.blogPost.findUnique({ where: { slug } });
        if (dbPost) {
            post = {
                title: dbPost.title,
                content: dbPost.content,
                category: dbPost.category,
                publishedAt: dbPost.publishedAt || new Date(),
                featuredImage: dbPost.featuredImage,
                featuredImageResourceType: dbPost.featuredImageResourceType
            };
        }
    } catch { /* defaults */ }

    if (!post) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
        image: post.featuredImage || 'https://nigersanitary.com/og-image.jpg',
        datePublished: post.publishedAt.toISOString(),
        author: {
            '@type': 'Organization',
            name: 'Niger Sanitary Industry Limited',
        },
    };

    return (
        <section style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container" style={{ maxWidth: '840px' }}>
                <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 500, fontSize: '0.9375rem', marginBottom: '32px' }}>
                    <ArrowLeft size={18} /> Back to Blog
                </Link>
            </div>
            <BlogContent post={post} />
        </section>
    );
}

