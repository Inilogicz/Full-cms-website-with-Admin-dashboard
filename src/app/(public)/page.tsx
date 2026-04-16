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

    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Niger Sanitary Industry Limited',
        url: 'https://nigersanitary.com',
        logo: 'https://nigersanitary.com/logo.png',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+234-XXX-XXXXXXX',
            contactType: 'customer service',
            areaServed: 'NG',
            availableLanguage: 'en',
        },
        sameAs: [
            'https://facebook.com/nigersanitary',
            'https://instagram.com/nigersanitary',
        ],
    };

    const websiteJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Niger Sanitary',
        url: 'https://nigersanitary.com',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://nigersanitary.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
            <HomeClient 
                settings={settings} 
                products={productsData} 
            />
        </>
    );
}


