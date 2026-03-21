import { prisma } from '@/lib/prisma';
import ProductsContent from '@/components/products/ProductsContent';
import ProductsHero from '@/components/products/ProductsHero';

export const dynamic = 'force-dynamic';

const defaultProducts = [
    {
        id: 'p6',
        name: 'LadySept Classic',
        slug: 'ladysept-classic',
        description: 'Our most popular sanitary pad, designed for maximum comfort and reliable everyday protection. Features high absorbency and a well-designed shape for flexibility.',
        category: 'Feminine Care',
        imageUrl: '/product6.JPG',
        color: '#FFF5F7',
        featured: true
    },
    {
        id: 'p1',
        name: 'LadySept Ultra Comfort',
        slug: 'ladysept-ultra-comfort',
        description: 'Ultra-thin design for maximum discretion without compromising on protection. Perfect for active women who need freedom and confidence.',
        category: 'Feminine Care',
        imageUrl: '/product1.JPG',
        color: '#F8F9FF',
    },
    {
        id: 'p2',
        name: 'LadySept Night Protection',
        slug: 'ladysept-night-protection',
        description: 'Extra-long pads with enhanced rear coverage and superior overnight absorbency to ensure a worry-free sleep.',
        category: 'Feminine Care',
        imageUrl: '/product2.JPG',
        color: '#F5F3FF',
    },
    {
        id: 'p3',
        name: 'LadySept Slim Fit',
        slug: 'ladysept-slim-fit',
        description: 'Specifically contoured for a snug fit, providing comfort and protection during moderate flow days.',
        category: 'Feminine Care',
        imageUrl: '/product3.JPG',
        color: '#FDF2F8',
    },
    {
        id: 'p4',
        name: 'LadySept Economy Pack',
        slug: 'ladysept-economy-pack',
        description: 'Great value pack providing the same trusted LadySept quality in a larger quantity for long-lasting supply.',
        category: 'Feminine Care',
        imageUrl: '/product4.JPG',
        color: '#F0FDFA',
    },
    {
        id: 'p5',
        name: 'LadySept Soft Touch',
        slug: 'ladysept-soft-touch',
        description: 'Features an extra-soft cotton-feel top sheet for sensitive skin, ensuring minimal irritation and maximum comfort.',
        category: 'Feminine Care',
        imageUrl: '/product5.JPG',
        color: '#FFFBEB',
    },
    {
        id: 'p7',
        name: 'LadySept Super Absorbent',
        slug: 'ladysept-super-absorbent',
        description: 'Heavy duty protection for the heaviest flow days. Reinforced with super-absorbent polymer technology.',
        category: 'Feminine Care',
        imageUrl: '/product7.JPG',
        color: '#EFF6FF',
    },
    {
        id: 'p8',
        name: 'Damson Premium Serviettes',
        slug: 'damson-premium-serviettes',
        description: 'High-quality, multi-ply paper serviettes perfect for formal dining and premium events. Soft and highly absorbent.',
        category: 'Home & Hygiene',
        imageUrl: '/product8.JPG',
        color: '#F9FAFB',
    },
    {
        id: 'p9',
        name: 'Damson Restaurant Napkins',
        slug: 'damson-restaurant-napkins',
        description: 'Durable and practical napkins designed for high-traffic food service environments and everyday family meals.',
        category: 'Home & Hygiene',
        imageUrl: '/product9.JPG',
        color: '#F0FDF4',
    },
    {
        id: 'p10',
        name: 'Absorbent Cotton Wool (50g)',
        slug: 'absorbent-cotton-wool-50g',
        description: 'Medical-grade 100% pure cotton wool. Ideal for wound care, cosmetics, and general hygiene. Sterilized for safety.',
        category: 'Medical Supplies',
        imageUrl: '/product10.JPG',
        color: '#F8FAFC',
    },
    {
        id: 'p11',
        name: 'Absorbent Cotton Wool (100g)',
        slug: 'absorbent-cotton-wool-100g',
        description: 'Larger pack of our premium medical cotton wool, suitable for hospital use and extended personal care.',
        category: 'Medical Supplies',
        imageUrl: '/product11.JPG',
        color: '#F8FAFC',
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
            featured: false
        }))
        : defaultProducts;

    return (
        <div className="products-container">
            <ProductsHero />
            <div id="products-grid">
                <ProductsContent products={products} />
            </div>
        </div>
    );
}
