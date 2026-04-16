const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Starting media type correction...');

    // Fix GalleryItems
    const galleryItems = await prisma.galleryItem.findMany();
    let galleryCount = 0;
    for (const item of galleryItems) {
        if (item.imageUrl.toLowerCase().endsWith('.mp4') && item.resourceType !== 'video') {
            await prisma.galleryItem.update({
                where: { id: item.id },
                data: { resourceType: 'video' }
            });
            galleryCount++;
            console.log(`Updated GalleryItem ${item.id} to video`);
        }
    }

    // Fix Media items
    const mediaItems = await prisma.media.findMany();
    let mediaCount = 0;
    for (const item of mediaItems) {
        if (item.cloudinaryUrl.toLowerCase().endsWith('.mp4') && item.resourceType !== 'video') {
            await prisma.media.update({
                where: { id: item.id },
                data: { resourceType: 'video' }
            });
            mediaCount++;
            console.log(`Updated Media ${item.id} to video`);
        }
    }

    // Fix BlogPosts (featuredImage)
    const blogPosts = await prisma.blogPost.findMany();
    let blogCount = 0;
    for (const post of blogPosts) {
        if (post.featuredImage?.toLowerCase().endsWith('.mp4') && post.featuredImageResourceType !== 'video') {
            await prisma.blogPost.update({
                where: { id: post.id },
                data: { featuredImageResourceType: 'video' }
            });
            blogCount++;
            console.log(`Updated BlogPost ${post.id} featured media to video`);
        }
    }

    console.log(`Finished. Updated ${galleryCount} gallery items, ${mediaCount} media items, and ${blogCount} blog posts.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
