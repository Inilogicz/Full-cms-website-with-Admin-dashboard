import { prisma } from '@/lib/prisma';
import HomeClient from '@/components/home/HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
    // Fetch home configuration and featured products on the server
    const [settings, productsData] = await Promise.all([
        prisma.homeConfig.findUnique({ where: { id: 'global' } }),
        prisma.product.findMany({
            where: { status: 'published', isFeatured: true },
            include: { images: true },
            orderBy: { createdAt: 'desc' }
        })
    ]);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Niger Sanitary Industry Limited',
        url: 'https://nigersanitary.com',
        logo: 'https://nigersanitary.com/logo.png',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+234-XXX-XXXXXXX', // I should check if I can find the actual phone
            contactType: 'customer service',
            areaServed: 'NG',
            availableLanguage: 'en',
        },
        sameAs: [
            'https://facebook.com/nigersanitary',
            'https://instagram.com/nigersanitary',
            // Add other social links if found
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HomeClient 
                settings={settings} 
                products={productsData} 
            />
        </>
    );
}

