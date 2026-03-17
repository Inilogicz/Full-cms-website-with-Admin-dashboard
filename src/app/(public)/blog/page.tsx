import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Menstrual Health Education Hub',
    description: 'Educational resources on menstrual health awareness, women empowerment, puberty education, and healthcare insights.',
};

const defaultPosts = [
    { id: '1', title: 'Understanding Menstrual Hygiene: A Complete Guide', slug: 'understanding-menstrual-hygiene', excerpt: 'Learn about the importance of menstrual hygiene and how to practice safe hygiene during menstruation.', category: 'Menstrual Health', publishedAt: new Date('2024-01-15'), featured: true },
    { id: '2', title: 'Breaking the Stigma: Empowering Women Through Education', slug: 'breaking-the-stigma', excerpt: 'How community education programs are changing attitudes towards menstruation across Nigeria.', category: 'Women Empowerment', publishedAt: new Date('2024-02-10'), featured: true },
    { id: '3', title: 'Puberty and Menstruation: What Every Young Girl Should Know', slug: 'puberty-and-menstruation', excerpt: 'A comprehensive guide for young girls approaching puberty and their first menstruation.', category: 'Puberty Education', publishedAt: new Date('2024-03-05'), featured: false },
    { id: '4', title: 'Choosing the Right Sanitary Products for Your Needs', slug: 'choosing-right-sanitary-products', excerpt: 'A detailed comparison of different sanitary product types to help you make informed decisions.', category: 'Healthcare Insights', publishedAt: new Date('2024-04-20'), featured: false },
    { id: '5', title: 'The Impact of Menstrual Health on Education in Nigeria', slug: 'menstrual-health-education-impact', excerpt: 'How menstrual health challenges affect school attendance and academic performance.', category: 'Menstrual Health', publishedAt: new Date('2024-05-12'), featured: false },
    { id: '6', title: 'Sustainable Approaches to Menstrual Product Manufacturing', slug: 'sustainable-manufacturing', excerpt: 'Our commitment to environmental responsibility in sanitary product production.', category: 'Healthcare Insights', publishedAt: new Date('2024-06-08'), featured: false },
];

const categories = ['All', 'Menstrual Health', 'Women Empowerment', 'Puberty Education', 'Healthcare Insights'];

export default async function BlogPage() {
    let posts = defaultPosts;
    try {
        const dbPosts = await prisma.blogPost.findMany({ where: { status: 'published' }, orderBy: { publishedAt: 'desc' } });
        if (dbPosts.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            posts = dbPosts.map((p: any) => ({ id: p.id, title: p.title, slug: p.slug, excerpt: p.excerpt || '', category: p.category, publishedAt: p.publishedAt || new Date(), featured: p.featured }));

        }
    } catch { /* defaults */ }

    const featuredPosts = posts.filter(p => p.featured);

    return (
        <>
            <section style={{ paddingTop: '160px', paddingBottom: '80px', background: 'var(--gradient-hero)' }}>
                <div className="container">
                    <span className="section-label" style={{ color: 'var(--accent-light)' }}>Education Hub</span>
                    <h1 style={{ color: 'var(--white)', maxWidth: '640px', marginBottom: '20px' }}>Menstrual Health Education</h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.125rem', maxWidth: '560px', lineHeight: 1.7 }}>
                        Empowering communities through knowledge, awareness, and health education resources.
                    </p>
                </div>
            </section>

            {/* Categories */}
            <section style={{ borderBottom: '1px solid var(--gray-100)', background: 'var(--white)' }}>
                <div className="container" style={{ display: 'flex', gap: '8px', padding: '16px 24px', overflowX: 'auto' }}>
                    {categories.map(cat => (
                        <span key={cat} className="badge badge-primary" style={{ cursor: 'pointer', whiteSpace: 'nowrap', padding: '8px 16px' }}>
                            {cat}
                        </span>
                    ))}
                </div>
            </section>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
                <section className="section" style={{ background: 'var(--gray-50)' }}>
                    <div className="container">
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Featured Articles</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                            {featuredPosts.map(post => (
                                <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: 'block' }}>
                                    <div className="card" style={{ height: '100%' }}>
                                        <div style={{ background: 'var(--gradient-primary)', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>📚</div>
                                        <div className="card-body">
                                            <span className="badge badge-primary" style={{ marginBottom: '10px' }}>{post.category}</span>
                                            <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>{post.title}</h3>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '12px', lineHeight: 1.6 }}>{post.excerpt}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--gray-400)' }}>
                                                <Calendar size={14} />
                                                {new Date(post.publishedAt).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Posts */}
            <section className="section">
                <div className="container">
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>All Articles</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                        {posts.map(post => (
                            <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: 'block' }}>
                                <div className="card" style={{ height: '100%' }}>
                                    <div className="card-body">
                                        <span className="badge badge-primary" style={{ marginBottom: '10px' }}>{post.category}</span>
                                        <h3 style={{ fontSize: '1.0625rem', marginBottom: '8px' }}>{post.title}</h3>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: '12px' }}>{post.excerpt}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '0.8125rem', color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Calendar size={14} />
                                                {new Date(post.publishedAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                Read <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
