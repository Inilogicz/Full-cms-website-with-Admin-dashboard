import { prisma } from '@/lib/prisma';
import BlogList from '@/components/blog/BlogList';
import FloatingProductBackground from '@/components/shared/FloatingProductBackground';

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
        <div className="blog-wrapper" style={{ background: 'white' }}>
            <section style={{
                paddingTop: '180px',
                paddingBottom: '120px',
                background: 'var(--gray-50)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Brand Visual Layer */}
                <FloatingProductBackground
                    theme="light"
                    intensity={60}
                    images={[
                        { url: '/product1.JPG', top: '15%', left: '5%', size: '120px', mobileSize: '60px', delay: 0, opacity: 0.2 },
                        { url: '/product6.JPG', top: '60%', left: '8%', size: '140px', mobileSize: '75px', delay: 0.4, opacity: 0.25 },
                        { url: '/product10.JPG', top: '20%', left: '85%', size: '130px', mobileSize: '70px', delay: 0.8, opacity: 0.2 },
                        { url: '/product4.JPG', top: '70%', left: '82%', size: '150px', mobileSize: '80px', delay: 1.2, opacity: 0.25 },
                    ]}
                />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ maxWidth: '800px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: 'var(--primary)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            marginBottom: '24px',
                            fontSize: '0.875rem'
                        }}>
                            <span style={{ width: '40px', height: '1px', background: 'var(--primary)', opacity: 0.3 }} />
                            Education Hub
                        </div>
                        <h1 style={{
                            color: 'var(--primary-dark)',
                            marginBottom: '32px',
                            fontSize: 'clamp(3rem, 7vw, 5rem)',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em'
                        }}>
                            Empowering Through <br />
                            <span className="text-gradient-gold">Health Knowledge</span>
                        </h1>
                        <p style={{
                            color: 'var(--gray-600)',
                            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                            maxWidth: '650px',
                            lineHeight: 1.8,
                            opacity: 0.9
                        }}>
                            Your primary resource for menstrual health awareness, women empowerment,
                            and healthcare insights tailored for the modern African woman.
                        </p>
                    </div>
                </div>

                {/* Decorative Background Text */}
                <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '5%',
                    fontSize: 'clamp(8rem, 20vw, 20rem)',
                    fontWeight: 900,
                    color: 'rgba(10, 77, 162, 0.03)',
                    whiteSpace: 'nowrap',
                    zIndex: 1,
                    pointerEvents: 'none',
                    letterSpacing: '-0.05em'
                }}>
                    BLOG
                </div>
            </section>

            <BlogList posts={posts} />
        </div>
    );
}
