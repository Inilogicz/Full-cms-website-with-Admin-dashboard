import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, Package, FileText, Layers, Image as ImageIcon } from 'lucide-react';
import { Metadata } from 'next';

const defaultProductsData: Record<string, any> = {
    'ladysept-classic': {
        name: 'LadySept Classic',
        description: 'Our flagship sanitary towel, trusted by millions of women across Nigeria. LadySept Classic provides a perfect balance of comfort, absorbency, and fit.',
        category: 'Feminine Care',
        specifications: { 'Material': 'Cotton-soft non-woven cover', 'Absorbency': 'High', 'Wings': 'Yes', 'Pack Size': '8/10 pads', 'Certification': 'NAFDAC & ISO 9001' },
        applications: 'Daily period protection, suitable for regular flow.',
        packaging: 'Available in standard packs and bulk cartons for retailers.',
        color: '#FFF5F7',
        imageUrl: '/product6.JPG'
    },
    'ladysept-ultra-comfort': {
        name: 'LadySept Ultra Comfort',
        description: 'Ultra-thin yet powerful. Designed for the modern active woman who needs invisible protection without compromising on safety.',
        category: 'Feminine Care',
        specifications: { 'Thickness': 'Ultra-thin', 'Core': 'Super-absorbent polymer (SAP)', 'Shape': 'Anatomical', 'Pack Size': '10 pads' },
        applications: 'Active lifestyles, tight clothing, light to moderate flow.',
        packaging: 'Individually wrapped for hygiene and portability.',
        color: '#F8F9FF',
        imageUrl: '/product1.JPG'
    },
    'ladysept-night-protection': {
        name: 'LadySept Night Protection',
        description: 'Extra long to keep you secure all night long. Features reinforced guards and a wider back for 360-degree protection.',
        category: 'Feminine Care',
        specifications: { 'Length': 'Extra Long (320mm+)', 'Absorbency': 'Maximum', 'Wings': 'Dual-layer wings', 'Pack Size': '8 pads' },
        applications: 'Overnight use, heavy flow days, post-partum.',
        packaging: 'Standard packs.',
        color: '#F5F3FF',
        imageUrl: '/product2.JPG'
    },
    'ladysept-slim-fit': {
        name: 'LadySept Slim Fit',
        description: 'A more contoured design that fits perfectly with your movements. Ideal for those who prefer a more personalized fit.',
        category: 'Feminine Care',
        specifications: { 'Design': 'Snug Fit', 'Material': 'Breathable top-sheet', 'Absorbency': 'Moderate', 'Pack Size': '10 pads' },
        applications: 'General use, school, workplace comfort.',
        packaging: 'Standard packs.',
        color: '#FDF2F8',
        imageUrl: '/product3.JPG'
    },
    'ladysept-economy-pack': {
        name: 'LadySept Economy Pack',
        description: 'The same trusted protection in a value-oriented package. Designed to provide quality hygiene at an accessible price point.',
        category: 'Feminine Care',
        specifications: { 'Value': 'Economy pack', 'Absorbency': 'Reliable', 'Wings': 'Yes', 'Quantity': 'Multi-pack options' },
        applications: 'Large households, budget-conscious consumers.',
        packaging: 'Budget-friendly bulk packs.',
        color: '#F0FDFA',
        imageUrl: '/product4.JPG'
    },
    'ladysept-soft-touch': {
        name: 'LadySept Soft Touch',
        description: 'Infused with a cotton-like softness that is gentle on sensitive skin. Prevents rashes and ensures maximum breathability.',
        category: 'Feminine Care',
        specifications: { 'Material': 'Cotton-soft non-irritating cover', 'Absorbency': 'Moderate to High', 'Breathability': 'High', 'Dermatology': 'Gentle' },
        applications: 'Sensitive skin, daily moderate flow.',
        packaging: 'Standard packs.',
        color: '#FFFBEB',
        imageUrl: '/product5.JPG'
    },
    'ladysept-super-absorbent': {
        name: 'LadySept Super Absorbent',
        description: 'Engineered for the heaviest days. Our SAP-heavy core locks in moisture instantly to keep you dry and comfortable.',
        category: 'Feminine Care',
        specifications: { 'Technology': 'Dual SAP Core', 'Absorbency': 'Ultra High', 'Wings': 'Reinforced', 'Pack Size': '8/10 pads' },
        applications: 'Heavy flow, long durations between changes.',
        packaging: 'Standard packs.',
        color: '#EFF6FF',
        imageUrl: '/product7.JPG'
    },
    'damson-premium-serviettes': {
        name: 'Damson Premium Serviettes',
        description: 'Add a touch of class to your dining. Our premium serviettes are thick, soft, and highly absorbent.',
        category: 'Home & Hygiene',
        specifications: { 'Material': 'Virgin pulp tissue', 'Layers': '2-Ply / 3-Ply options', 'Texture': 'Embossed', 'Pack Size': '50/100 sheets' },
        applications: 'Formal events, hotel service, luxury dining.',
        packaging: 'Transparent plastic wrap.',
        color: '#F9FAFB',
        imageUrl: '/product8.JPG'
    },
    'damson-restaurant-napkins': {
        name: 'Damson Restaurant Napkins',
        description: 'Designed for durability and value. These napkins are the choice for over 1000 food establishments in Nigeria.',
        category: 'Home & Hygiene',
        specifications: { 'Material': 'Absorbent tissue', 'Durability': 'High', 'Value': 'Best price-per-sheet', 'Pack Size': 'Bulk bundles' },
        applications: 'Restaurants, cafeterias, fast food, family use.',
        packaging: 'Bulk bundles.',
        color: '#F0FDF4',
        imageUrl: '/product9.JPG'
    },
    'absorbent-cotton-wool-50g': {
        name: 'Absorbent Cotton Wool (50g)',
        description: 'Medical-grade absorbent cotton wool for professional and home healthcare use. 100% pure and highly absorbent.',
        category: 'Medical Supplies',
        specifications: { 'Material': '100% Natural Cotton', 'Sterility': 'High standards', 'Weight': '50g', 'Certification': 'Medical Grade' },
        applications: 'Wound cleaning, makeup removal, clinical swabs.',
        packaging: 'Sealed moisture-proof wrap.',
        color: '#F8FAFC',
        imageUrl: '/product10.JPG'
    },
    'absorbent-cotton-wool-100g': {
        name: 'Absorbent Cotton Wool (100g)',
        description: 'Large size clinic-ready cotton wool. Ideal for hospitals and extensive home first-aid kits.',
        category: 'Medical Supplies',
        specifications: { 'Material': '100% Natural Cotton', 'Sterility': 'High standards', 'Weight': '100g', 'Certification': 'Medical Grade' },
        applications: 'Hospitals, surgical preparation, bulk medical use.',
        packaging: 'Sealed moisture-proof wrap.',
        color: '#F8FAFC',
        imageUrl: '/product11.JPG'
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

    // Fuzzy/Direct mapping for slugs
    let productKey = slug;
    if (slug === 'ladysept-sanitary-towels' && !defaultProductsData[slug]) {
        productKey = 'ladysept-classic'; // Fallback to classic
    }

    let product: any = defaultProductsData[productKey];
    let images: any[] = [];

    try {
        const dbProduct = await prisma.product.findUnique({
            where: { slug: productKey },
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
                imageUrl: dbProduct.images[0]?.cloudinaryUrl
            };
            images = dbProduct.images;
        }
    } catch { /* use default */ }

    if (!product) notFound();

    const mainImageUrl = images.length > 0 ? images[0].cloudinaryUrl : (product.imageUrl || '/image.png');
    const specs = product.specifications || {};

    // Filter suggested products
    const suggestedProducts = Object.entries(defaultProductsData)
        .filter(([key]) => key !== productKey)
        .slice(0, 3)
        .map(([key, data]) => ({ slug: key, ...data }));

    return (
        <div className="product-detail-wrapper" style={{ background: '#FDFDFF' }}>
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

                        {/* Product Gallery - Fixed Sticky Implementation */}
                        <div className="product-gallery-container">
                            <div style={{
                                aspectRatio: '1',
                                overflow: 'hidden',
                                border: '1px solid #E2E8F0',
                                boxShadow: '0 20px 50px -12px rgba(0,0,0,0.05)',
                                padding: '40px'
                            }}>
                                <img
                                    src={mainImageUrl}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>

                            {images.length > 1 && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '16px', marginTop: '24px' }}>
                                    {images.map((img, i) => (
                                        <div
                                            key={img.id}
                                            style={{
                                                aspectRatio: '1',
                                                borderRadius: '16px',
                                                overflow: 'hidden',
                                                border: i === 0 ? '2px solid var(--primary)' : '1px solid var(--gray-100)',
                                                cursor: 'pointer',
                                                padding: '8px',
                                                background: 'white'
                                            }}>
                                            <img src={img.cloudinaryUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

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
