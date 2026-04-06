const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const admins = await prisma.admin.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true
            }
        });
        console.log('Admins found in database:');
        console.table(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
