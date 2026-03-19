import { prisma } from '@/lib/prisma';
import ProductsContent from '@/components/products/ProductsContent';

export const dynamic = 'force-dynamic';

const defaultProducts = [
    {
        id: 'default-1',
        name: 'LadySept Sanitary Towels',
        slug: 'ladysept-sanitary-towels',
        description: 'Premium quality sanitary pads designed for maximum comfort, protection, and confidence. Available in different sizes and absorbency levels.',
        category: 'Feminine Care',
        imageUrl: '/products/ladysept.jpg',
        color: '#FDF2F8',
    },
    {
        id: 'default-2',
        name: 'Damson Serviette',
        slug: 'damson-serviette',
        description: 'Soft, multi-purpose napkins/serviettes ideal for restaurants, hotels, and household use. Made with premium tissue materials.',
        category: 'Hygiene',
        imageUrl: '/products/damson.jpg',
        color: '#F0F9FF',
    },
    {
        id: 'default-3',
        name: 'Absorbent Cotton Wool',
        slug: 'absorbent-cotton-wool',
        description: 'Medical-grade absorbent cotton wool for wound care, personal hygiene, and laboratory use. 100% pure and sterilized.',
        category: 'Medical',
        imageUrl: '/products/cotton.jpg',
        color: '#F0FDF4',
    },
];

export default async function ProductsPage() {
    const productsData = await prisma.product.findMany({
        where: { status: 'published' },
        include: { images: true }
    });

    const products = productsData.length > 0
        ? productsData.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            description: p.description,
            category: p.category,
            imageUrl: p.images[0]?.cloudinaryUrl,
            color: '#F9FAFB',
        }))
        : defaultProducts;

    return (
        <div className="products-wrapper">
            <section style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div>
                        <span className="section-label" style={{ color: 'var(--gold-dark)', fontWeight: 800 }}>Our Collection</span>
                        <h1 style={{ color: 'var(--primary-dark)', marginBottom: '24px', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }}>
                            Quality Healthcare & <br />
                            <span className="text-gradient-gold">Hygiene Solutions</span>
                        </h1>
                        <p style={{ color: 'var(--gray-600)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}>
                            Manufactured to international standards in our state-of-the-art facility.
                        </p>
                    </div>
                </div>

                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    zIndex: 1
                }} />
            </section>

            <ProductsContent products={products} />
        </div>
    );
}
