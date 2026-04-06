const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.product.count();
        console.log(`Total products in database: ${count}`);
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
