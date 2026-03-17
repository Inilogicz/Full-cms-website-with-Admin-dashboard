import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, Package, FileText, Layers } from 'lucide-react';
import { Metadata } from 'next';

const defaultProductsData: Record<string, {
    name: string; description: string; category: string;
    specifications: Record<string, string>; applications: string; packaging: string;
    icon: string; color: string;
}> = {
    'ladysept-sanitary-towels': {
        name: 'LadySept Sanitary Towels',
        description: 'LadySept Sanitary Towels are premium quality sanitary pads designed for maximum comfort and protection. Manufactured using advanced technology and high-grade raw materials, they provide exceptional absorbency, leak-proof performance, and all-day comfort. Available in multiple sizes and absorbency levels to suit different needs.',
        category: 'Feminine Care',
        specifications: { 'Material': 'Super-absorbent polymer core', 'Sizes': 'Regular, Long, Overnight', 'Absorbency': 'High to Ultra', 'Features': 'Wings, leak guards, cotton-soft cover', 'Certification': 'NAFDAC Approved' },
        applications: 'Daily menstrual protection for women and girls. Suitable for light, moderate, and heavy flow days.',
        packaging: 'Available in packs of 8, 16, and economy packs of 32. Individual wrapping for hygiene.',
        icon: '🩹', color: '#E3F2FD',
    },
    'damson-serviette': {
        name: 'Damson Serviette',
        description: 'Damson Serviette tissues are premium multi-ply napkins perfect for dining, hospitality, and everyday use. Made from eco-friendly materials with superior softness and absorbency.',
        category: 'Hygiene',
        specifications: { 'Material': 'Virgin tissue pulp', 'Ply': '2-ply and 3-ply options', 'Sizes': '30x30cm, 33x33cm', 'Colors': 'White, assorted', 'Certification': 'Food-safe certified' },
        applications: 'Restaurants, hotels, catering, offices, and household dining.',
        packaging: 'Packs of 50, 100. Bulk cartons available for commercial use.',
        icon: '🧻', color: '#F0F7FF',
    },
    'absorbent-cotton-wool': {
        name: 'Absorbent Cotton Wool',
        description: 'Medical-grade 100% pure absorbent cotton wool for healthcare, wound care, and personal hygiene applications. Sterilized and quality-tested for clinical and home use.',
        category: 'Medical',
        specifications: { 'Material': '100% pure cotton', 'Grade': 'Medical / Pharmaceutical', 'Absorbency': 'Superior (>23g/g)', 'Sterilization': 'Gamma-ray sterilized', 'Certification': 'NAFDAC & ISO Certified' },
        applications: 'Wound dressing, medical swabbing, personal care, cosmetic use, laboratory applications.',
        packaging: 'Available in 25g, 50g, 100g, 250g, 500g rolls. Hospital bulk packs available.',
        icon: '🏥', color: '#E8F5E9',
    },
    'damson-underpad': {
        name: 'Damson Underpad',
        description: 'High-absorbency disposable underpads designed for patient care, incontinence management, and surface protection in healthcare settings.',
        category: 'Medical',
        specifications: { 'Material': 'Multi-layer absorbent core', 'Sizes': '60x60cm, 60x90cm', 'Absorbency': '1000-2000ml', 'Backing': 'Waterproof PE film', 'Certification': 'NAFDAC Approved' },
        applications: 'Hospital beds, nursing homes, home care, post-surgical care, maternity wards.',
        packaging: 'Packs of 10, 20. Hospital cartons of 100 units.',
        icon: '🛏️', color: '#FFF3E0',
    },
    'work-floor-underpad': {
        name: 'Work Floor Underpad',
        description: 'Industrial-grade absorbent pads for workplace spill management, factory floor protection, and industrial cleaning applications.',
        category: 'Industrial',
        specifications: { 'Material': 'Heavy-duty absorbent layers', 'Sizes': '60x90cm, 90x120cm', 'Absorbency': 'Industrial-grade', 'Backing': 'Non-slip waterproof base', 'Application': 'Factories, workshops, warehouses' },
        applications: 'Factory floors, workshops, warehouses, maintenance areas, spill containment.',
        packaging: 'Packs of 10, 25. Industrial cartons available.',
        icon: '🏗️', color: '#F3E5F5',
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
    let product = defaultProductsData[slug];

    try {
        const dbProduct = await prisma.product.findUnique({ where: { slug } });
        if (dbProduct) {
            product = {
                name: dbProduct.name,
                description: dbProduct.description,
                category: dbProduct.category,
                specifications: (dbProduct.specifications as Record<string, string>) || {},
                applications: dbProduct.applications || '',
                packaging: dbProduct.packaging || '',
                icon: '📦',
                color: '#E3F2FD',
            };
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

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
                        {/* Product Image */}
                        <div style={{
                            background: product.color,
                            borderRadius: 'var(--radius-xl)',
                            padding: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '120px',
                            aspectRatio: '1',
                        }}>
                            {product.icon}
                        </div>

                        {/* Product Info */}
                        <div>
                            <span className="badge badge-primary" style={{ marginBottom: '16px' }}>{product.category}</span>
                            <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>{product.name}</h1>
                            <p style={{ color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: '32px', fontSize: '1.0625rem' }}>{product.description}</p>

                            {/* Specifications */}
                            <div style={{ marginBottom: '32px' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', marginBottom: '16px' }}>
                                    <FileText size={18} style={{ color: 'var(--primary)' }} /> Technical Specifications
                                </h3>
                                <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                                    {Object.entries(specs).map(([key, value], i) => (
                                        <div key={key} style={{
                                            display: 'flex', padding: '12px 16px',
                                            borderBottom: i < Object.keys(specs).length - 1 ? '1px solid var(--gray-100)' : 'none',
                                        }}>
                                            <span style={{ fontWeight: 600, width: '140px', flexShrink: 0, fontSize: '0.875rem', color: 'var(--gray-600)' }}>{key}</span>
                                            <span style={{ fontSize: '0.875rem', color: 'var(--gray-800)' }}>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Applications */}
                            {product.applications && (
                                <div style={{ marginBottom: '32px' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', marginBottom: '8px' }}>
                                        <Layers size={18} style={{ color: 'var(--primary)' }} /> Applications
                                    </h3>
                                    <p style={{ color: 'var(--gray-600)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{product.applications}</p>
                                </div>
                            )}

                            {/* Packaging */}
                            {product.packaging && (
                                <div style={{ marginBottom: '32px' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', marginBottom: '8px' }}>
                                        <Package size={18} style={{ color: 'var(--primary)' }} /> Packaging Options
                                    </h3>
                                    <p style={{ color: 'var(--gray-600)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{product.packaging}</p>
                                </div>
                            )}

                            {/* CTA */}
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <Link href="/distributor" className="btn btn-primary btn-lg">
                                    <Phone size={18} /> Distributor Inquiry
                                </Link>
                                <Link href="/contact" className="btn btn-secondary btn-lg">
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
