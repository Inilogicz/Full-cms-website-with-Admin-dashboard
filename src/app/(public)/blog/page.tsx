import { prisma } from '@/lib/prisma';
import BlogList from '@/components/blog/BlogList';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const postsData = await prisma.blogPost.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' }
    });

    const posts = postsData.map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || '',
        category: p.category,
        publishedAt: p.publishedAt || p.createdAt,
        featuredImage: p.featuredImage
    }));

    return (
        <div className="blog-wrapper">
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div>
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Education Hub</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            Empowering Through <br />
                            <span className="text-gradient-gold">Health Knowledge</span>
                        </h1>
                        <p style={{ color: 'var(--gray-600)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}>
                            Educational resources on menstrual health awareness, women empowerment, and healthcare insights.
                        </p>
                    </div>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-5%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    zIndex: 1
                }} />
            </section>

            <BlogList posts={posts} />
        </div>
    );
}
