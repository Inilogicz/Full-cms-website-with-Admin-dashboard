import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, Package, FileText, Layers, Image as ImageIcon } from 'lucide-react';
import { Metadata } from 'next';

const defaultProductsData: Record<string, any> = {
    'ladysept-sanitary-towels': {
        name: 'LadySept Sanitary Towels',
        description: 'LadySept Sanitary Towels are premium quality sanitary pads designed for maximum comfort and protection. Manufactured using advanced technology and high-grade raw materials, they provide exceptional absorbency, leak-proof performance, and all-day comfort. Available in multiple sizes and absorbency levels to suit different needs.',
        category: 'Feminine Care',
        specifications: { 'Material': 'Super-absorbent polymer core', 'Sizes': 'Regular, Long, Overnight', 'Absorbency': 'High to Ultra', 'Features': 'Wings, leak guards, cotton-soft cover', 'Certification': 'NAFDAC Approved' },
        applications: 'Daily menstrual protection for women and girls. Suitable for light, moderate, and heavy flow days.',
        packaging: 'Available in packs of 8, 16, and economy packs of 32. Individual wrapping for hygiene.',
        color: '#E3F2FD',
    },
};

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = defaultProductsData[slug];
    return { title: product?.name || 'Product', description: product?.description?.substring(0, 160) };
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    let product: any = defaultProductsData[slug];
    let images: any[] = [];

    try {
        const dbProduct = await prisma.product.findUnique({
            where: { slug },
            include: { images: true }
        });
        if (dbProduct) {
            product = {
                name: dbProduct.name,
                description: dbProduct.description,
                category: dbProduct.category,
                specifications: (dbProduct.specifications as Record<string, string>) || {},
                applications: dbProduct.applications || '',
                packaging: dbProduct.packaging || '',
                color: '#F9FAFB',
            };
            images = dbProduct.images;
        }
    } catch { /* use default */ }

    if (!product) notFound();

    const specs = product.specifications || {};

    return (
        <>
            <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--gray-50)' }}>
                <div className="container">
                    <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 500, fontSize: '0.9375rem', marginBottom: '24px' }}>
                        <ArrowLeft size={18} /> Back to Products
                    </Link>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) 1fr', gap: '48px', alignItems: 'start' }}>
                        {/* Product Gallery */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{
                                background: product.color,
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                aspectRatio: '1',
                                overflow: 'hidden',
                                border: '1px solid var(--gray-200)',
                            }}>
                                {images.length > 0 ? (
                                    <img src={images[0].cloudinaryUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ fontSize: '120px', opacity: 0.1 }}>📦</div>
                                )}
                            </div>

                            {images.length > 1 && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '12px' }}>
                                    {images.map((img, i) => (
                                        <div key={img.id} style={{
                                            aspectRatio: '1',
                                            borderRadius: 'var(--radius-lg)',
                                            overflow: 'hidden',
                                            border: i === 0 ? '2px solid var(--primary)' : '1px solid var(--gray-200)',
                                            cursor: 'pointer'
                                        }}>
                                            <img src={img.cloudinaryUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            <span className="badge badge-primary" style={{ marginBottom: '16px' }}>{product.category}</span>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', fontWeight: 700 }}>{product.name}</h1>
                            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '32px', fontSize: '1.125rem' }}>{product.description}</p>

                            {/* Specifications */}
                            {Object.keys(specs).length > 0 && (
                                <div style={{ marginBottom: '32px' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', marginBottom: '16px', fontWeight: 600 }}>
                                        <FileText size={18} style={{ color: 'var(--primary)' }} /> Technical Specifications
                                    </h3>
                                    <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                                        {Object.entries(specs).map(([key, value], i) => (
                                            <div key={key} style={{
                                                display: 'flex', padding: '14px 20px',
                                                borderBottom: i < Object.keys(specs).length - 1 ? '1px solid var(--gray-100)' : 'none',
                                            }}>
                                                <span style={{ fontWeight: 600, width: '160px', flexShrink: 0, fontSize: '0.875rem', color: 'var(--gray-600)' }}>{key}</span>
                                                <span style={{ fontSize: '0.875rem', color: 'var(--gray-800)' }}>{value as string}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Applications */}
                            {product.applications && (
                                <div style={{ marginBottom: '32px' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', marginBottom: '8px', fontWeight: 600 }}>
                                        <Layers size={18} style={{ color: 'var(--primary)' }} /> Applications
                                    </h3>
                                    <p style={{ color: 'var(--gray-600)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{product.applications}</p>
                                </div>
                            )}

                            {/* Packaging */}
                            {product.packaging && (
                                <div style={{ marginBottom: '32px' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', marginBottom: '8px', fontWeight: 600 }}>
                                        <Package size={18} style={{ color: 'var(--primary)' }} /> Packaging Options
                                    </h3>
                                    <p style={{ color: 'var(--gray-600)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{product.packaging}</p>
                                </div>
                            )}

                            {/* CTA */}
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '40px' }}>
                                <Link href="/distributor" className="btn btn-primary btn-lg" style={{ padding: '14px 28px' }}>
                                    <Phone size={18} /> Distributor Inquiry
                                </Link>
                                <Link href="/contact" className="btn btn-secondary btn-lg" style={{ padding: '14px 28px' }}>
                                    <Mail size={18} /> Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
