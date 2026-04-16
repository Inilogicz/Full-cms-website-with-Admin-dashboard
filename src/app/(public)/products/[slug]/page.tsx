import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, Package, FileText, Layers, Image as ImageIcon } from 'lucide-react';
import { Metadata } from 'next';
import ProductGallery from '@/components/products/ProductGallery';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    
    const dbProduct = await prisma.product.findUnique({
        where: { slug },
        include: { images: true }
    });

    if (dbProduct) {
        const title = `${dbProduct.name} | Niger Sanitary Industry Limited`;
        const description = dbProduct.description?.substring(0, 160) || `Learn more about ${dbProduct.name} by Niger Sanitary.`;
        const url = `https://nigersanitary.com/products/${slug}`;
        const ogImage = dbProduct.images[0]?.cloudinaryUrl || '/og-image.jpg';

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
                type: 'website',
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: dbProduct.name,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: [ogImage],
            },
        };
    }

    return { title: 'Product Not Found', description: 'The requested product could not be found.' };
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;

    const dbProduct = await prisma.product.findUnique({
        where: { slug: slug },
        include: { images: true }
    });

    if (!dbProduct) notFound();

    const product = {
        name: dbProduct.name,
        description: dbProduct.description,
        category: dbProduct.category,
        specifications: (dbProduct.specifications as Record<string, string>) || {},
        applications: dbProduct.applications || '',
        packaging: dbProduct.packaging || '',
        color: '#F9FAFB',
    };
    const images = dbProduct.images;
    const specs = product.specifications || {};

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: images.map(img => img.cloudinaryUrl),
        category: product.category,
        brand: {
            '@type': 'Brand',
            name: 'Niger Sanitary Industry Limited',
        },
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            url: `https://nigersanitary.com/products/${slug}`,
            priceCurrency: 'NGN',
        },
    };

    // Dynamic suggested products
    const related = await prisma.product.findMany({
        where: {
            slug: { not: slug },
            status: 'published'
        },
        take: 3,
        include: { images: true }
    });
    
    const suggestedProducts = related.map(p => ({
        name: p.name,
        slug: p.slug,
        description: p.description,
        imageUrl: p.images[0]?.cloudinaryUrl || '/image.png'
    }));

    return (
        <div className="product-detail-wrapper" style={{ background: '#FDFDFF' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <section style={{ paddingTop: '160px', paddingBottom: '100px' }}>

                <div className="container">
                    <Link href="/products" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--gray-400)',
                        fontWeight: 700,
                        fontSize: '0.8125rem',
                        marginBottom: '48px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        transition: 'color 0.3s ease'
                    }} className="hover:text-primary">
                        <ArrowLeft size={16} /> All Collections
                    </Link>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '80px',
                        alignItems: 'start',
                        position: 'relative'
                    }} className="responsive-grid-2 product-detail-grid">

                        {/* Product Gallery - Client Component */}
                        <ProductGallery images={images} productName={product.name} />

                        {/* Product Info */}
                        <div style={{ paddingBottom: '80px' }}>
                            <div style={{ marginBottom: '40px' }}>
                                <span style={{
                                    display: 'inline-block',
                                    background: 'var(--primary-50)',
                                    color: 'var(--primary)',
                                    padding: '6px 16px',
                                    borderRadius: '100px',
                                    fontWeight: 800,
                                    fontSize: '0.6875rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '20px'
                                }}>
                                    {product.category}
                                </span>
                                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--primary-dark)', marginBottom: '24px', fontWeight: 900, lineHeight: 1.2 }}>
                                    {product.name}
                                </h1>
                                <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: '1.125rem', fontWeight: 500 }}>
                                    {product.description}
                                </p>
                            </div>

                            {/* Specifications */}
                            {Object.keys(specs).length > 0 && (
                                <div style={{ marginBottom: '48px' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.125rem', marginBottom: '20px', fontWeight: 800, color: 'var(--primary-dark)' }}>
                                        <FileText size={20} style={{ color: 'var(--gold)' }} /> Specifications
                                    </h3>
                                    <div style={{ border: '1px solid #EDF2F7', borderRadius: '24px', overflow: 'hidden' }}>
                                        {Object.entries(specs).map(([key, value], i) => (
                                            <div key={key} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '12px 20px',
                                                background: i % 2 === 0 ? 'white' : '#F7FAFC',
                                                borderBottom: i === Object.keys(specs).length - 1 ? 'none' : '1px solid #EDF2F7'
                                            }}>
                                                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--gray-500)' }}>{key}</span>
                                                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--primary-dark)' }}>{value as string}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Details Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '48px' }}>
                                {product.applications && (
                                    <div style={{ padding: '24px', background: '#F7FAFC', borderRadius: '24px', border: '1px solid #EDF2F7' }}>
                                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', marginBottom: '12px', fontWeight: 800, color: 'var(--primary-dark)' }}>
                                            <Layers size={18} style={{ color: 'var(--primary)' }} /> Key Applications
                                        </h3>
                                        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', lineHeight: 1.6 }}>{product.applications}</p>
                                    </div>
                                )}
                                {product.packaging && (
                                    <div style={{ padding: '24px', background: '#F7FAFC', borderRadius: '24px', border: '1px solid #EDF2F7' }}>
                                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', marginBottom: '12px', fontWeight: 800, color: 'var(--primary-dark)' }}>
                                            <Package size={18} style={{ color: 'var(--primary)' }} /> Standard Packaging
                                        </h3>
                                        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', lineHeight: 1.6 }}>{product.packaging}</p>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <Link href="/distributor" style={{
                                    background: 'var(--primary)',
                                    color: 'white',
                                    padding: '16px 32px',
                                    borderRadius: '100px',
                                    fontWeight: 800,
                                    fontSize: '0.9375rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    Bulk Inquiry
                                </Link>
                                <Link href="/contact" style={{
                                    border: '2px solid #E2E8F0',
                                    color: 'var(--primary-dark)',
                                    padding: '16px 32px',
                                    borderRadius: '100px',
                                    fontWeight: 800,
                                    fontSize: '0.9375rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    Technical Support
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    <div style={{ borderTop: '1px solid #EDF2F7', paddingTop: '80px', marginTop: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '40px', color: 'var(--primary-dark)' }}>Related Products</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                            {suggestedProducts.map((p) => (
                                <Link key={p.slug} href={`/products/${p.slug}`} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        background: 'white',
                                        borderRadius: '24px',
                                        padding: '24px',
                                        border: '1px solid #EDF2F7',
                                        height: '100%',
                                        transition: 'all 0.3s ease'
                                    }} className="hover:shadow-lg">
                                        <div style={{
                                            aspectRatio: '1',
                                            borderRadius: '16px',
                                            background: '#F7FAFC',
                                            marginBottom: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                            padding: '20px'
                                        }}>
                                            <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </div>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '8px' }}>{p.name}</h3>
                                        <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', lineHeight: 1.5 }}>{p.description.substring(0, 80)}...</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
