const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const settings = await prisma.homeConfig.findUnique({
            where: { id: 'global' }
        });
        console.log('SETTINGS:', JSON.stringify(settings, null, 2));
    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        await prisma.$disconnect();
    }
}

check();
