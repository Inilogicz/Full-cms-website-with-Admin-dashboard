import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Products',
    description: 'Explore our range of quality sanitary pads, medical consumables, and hygiene products manufactured to international standards.',
};

const defaultProducts = [
    {
        id: 'default-1',
        name: 'LadySept Sanitary Towels',
        slug: 'ladysept-sanitary-towels',
        description: 'Premium quality sanitary pads designed for maximum comfort, protection, and confidence. Available in different sizes and absorbency levels.',
        category: 'Feminine Care',
        icon: '🩹',
        color: '#E3F2FD',
    },
    {
        id: 'default-2',
        name: 'Damson Serviette',
        slug: 'damson-serviette',
        description: 'Soft, multi-purpose napkins/serviettes ideal for restaurants, hotels, and household use. Made with premium tissue materials.',
        category: 'Hygiene',
        icon: '🧻',
        color: '#F0F7FF',
    },
    {
        id: 'default-3',
        name: 'Absorbent Cotton Wool',
        slug: 'absorbent-cotton-wool',
        description: 'Medical-grade absorbent cotton wool for wound care, personal hygiene, and laboratory use. 100% pure and sterilized.',
        category: 'Medical',
        icon: '🏥',
        color: '#E8F5E9',
    },
    {
        id: 'default-4',
        name: 'Damson Underpad',
        slug: 'damson-underpad',
        description: 'High-absorbency disposable underpads for patient care, incontinence management, and hospital use.',
        category: 'Medical',
        icon: '🛏️',
        color: '#FFF3E0',
    },
    {
        id: 'default-5',
        name: 'Work Floor Underpad',
        slug: 'work-floor-underpad',
        description: 'Industrial-grade absorbent underpads for workplaces, ensuring cleanliness and spill management in factory settings.',
        category: 'Industrial',
        icon: '🏗️',
        color: '#F3E5F5',
    },
];

export default async function ProductsPage() {
    let products = defaultProducts;

    try {
        const dbProducts = await prisma.product.findMany({
            where: { status: 'published' },
            orderBy: { createdAt: 'desc' },
        });
        if (dbProducts.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            products = dbProducts.map((p: any) => ({

                id: p.id,
                name: p.name,
                slug: p.slug,
                description: p.description,
                category: p.category,
                icon: '📦',
                color: '#E3F2FD',
            }));
        }
    } catch {
        // Use default products if DB not available
    }

    return (
        <>
            <section style={{
                paddingTop: '160px',
                paddingBottom: '80px',
                background: 'var(--gradient-hero)',
            }}>
                <div className="container">
                    <span className="section-label" style={{ color: 'var(--accent-light)' }}>Our Products</span>
                    <h1 style={{ color: 'var(--white)', maxWidth: '640px', marginBottom: '20px' }}>
                        Quality Healthcare & Hygiene Products
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.125rem', maxWidth: '560px', lineHeight: 1.7 }}>
                        Manufactured to international standards in our state-of-the-art facility.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '28px',
                    }}>
                        {products.map((product) => (
                            <Link key={product.id} href={`/products/${product.slug}`} style={{ display: 'block' }}>
                                <div className="card" style={{ height: '100%' }}>
                                    <div style={{
                                        background: product.color,
                                        padding: '48px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '72px',
                                    }}>
                                        {product.icon}
                                    </div>
                                    <div className="card-body" style={{ padding: '28px' }}>
                                        <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
                                            {product.category}
                                        </span>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{product.name}</h3>
                                        <p style={{ fontSize: '0.9375rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
                                            {product.description}
                                        </p>
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
