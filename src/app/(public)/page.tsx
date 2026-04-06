import { prisma } from '@/lib/prisma';
import HomeClient from '@/components/home/HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
    // Fetch home configuration and featured products on the server
    const [settings, productsData] = await Promise.all([
        prisma.homeConfig.findUnique({ where: { id: 'global' } }),
        prisma.product.findMany({
            where: { status: 'published' },
            take: 4,
            include: { images: true },
            orderBy: { createdAt: 'desc' }
        })
    ]);

    return (
        <HomeClient 
            settings={settings} 
            products={productsData} 
        />
    );
}
