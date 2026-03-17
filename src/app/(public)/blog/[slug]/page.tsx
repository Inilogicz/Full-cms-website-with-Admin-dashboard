import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Metadata } from 'next';

const defaultBlogPosts: Record<string, { title: string; content: string; category: string; publishedAt: Date }> = {
    'understanding-menstrual-hygiene': {
        title: 'Understanding Menstrual Hygiene: A Complete Guide',
        content: `<h2>The Importance of Menstrual Hygiene</h2><p>Menstrual hygiene management is a critical aspect of women's health that affects millions of women and girls in Nigeria. Proper hygiene during menstruation is essential for preventing infections, maintaining health, and preserving dignity.</p><h2>Best Practices</h2><p>Using quality sanitary products like LadySept sanitary towels ensures comfort and protection. Change pads regularly (every 4-6 hours), wash hands before and after handling sanitary products, and dispose of used products properly.</p><h2>Breaking Barriers</h2><p>Education and access to sanitary products are key to breaking the stigma around menstruation. Niger Sanitary Industry Limited is committed to making quality products accessible and affordable across Nigeria.</p>`,
        category: 'Menstrual Health',
        publishedAt: new Date('2024-01-15'),
    },
    'breaking-the-stigma': {
        title: 'Breaking the Stigma: Empowering Women Through Education',
        content: `<h2>Changing Attitudes</h2><p>Menstruation remains a taboo topic in many Nigerian communities. This silence leads to misinformation, shame, and health risks. Through community outreach programs, we are working to normalize conversations about menstrual health.</p><h2>Our Initiatives</h2><p>Niger Sanitary partners with schools, community organizations, and health workers to provide menstrual health education. These programs reach thousands of girls and women annually.</p>`,
        category: 'Women Empowerment',
        publishedAt: new Date('2024-02-10'),
    },
};

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = defaultBlogPosts[slug];
    return { title: post?.title || 'Blog Post' };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    let post = defaultBlogPosts[slug];

    try {
        const dbPost = await prisma.blogPost.findUnique({ where: { slug } });
        if (dbPost) {
            post = { title: dbPost.title, content: dbPost.content, category: dbPost.category, publishedAt: dbPost.publishedAt || new Date() };
        }
    } catch { /* defaults */ }

    if (!post) notFound();

    return (
        <section style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container" style={{ maxWidth: '780px' }}>
                <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 500, fontSize: '0.9375rem', marginBottom: '32px' }}>
                    <ArrowLeft size={18} /> Back to Blog
                </Link>

                <span className="badge badge-primary" style={{ marginBottom: '16px' }}>
                    <Tag size={12} style={{ marginRight: '4px' }} />{post.category}
                </span>
                <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '16px' }}>{post.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gray-400)', fontSize: '0.9375rem', marginBottom: '40px' }}>
                    <Calendar size={16} />
                    {new Date(post.publishedAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>

                <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    style={{ color: 'var(--gray-700)', lineHeight: 1.8, fontSize: '1.0625rem' }}
                    className="blog-content"
                />



            </div>
        </section>
    );
}
