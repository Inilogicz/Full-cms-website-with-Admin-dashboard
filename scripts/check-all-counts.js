const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const counts = {
            admins: await prisma.admin.count(),
            products: await prisma.product.count(),
            blogPosts: await prisma.blogPost.count(),
            events: await prisma.event.count(),
            faqs: await prisma.fAQ.count(),
            galleryItems: await prisma.galleryItem.count(),
        };
        console.table(counts);
    } catch (error) {
        console.error('Error fetching counts:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
