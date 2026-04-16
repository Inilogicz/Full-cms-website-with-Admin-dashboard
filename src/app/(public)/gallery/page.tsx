import { prisma } from '@/lib/prisma';
import GalleryContent from '@/components/gallery/GalleryContent';
import GalleryHero from '@/components/gallery/GalleryHero';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
    const items = await prisma.galleryItem.findMany({
        orderBy: { order: 'asc' }
    });

    return (
        <div className="gallery-wrapper">
            <GalleryHero />

            <GalleryContent items={items.map((item: any) => ({
                id: item.id,
                caption: item.caption,
                category: item.category,
                imageUrl: item.imageUrl,
                resourceType: item.resourceType
            }))} />
        </div>
    );
}
