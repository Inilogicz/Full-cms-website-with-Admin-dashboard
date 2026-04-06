const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@nigersanitary.com';
    const password = 'admin123';
    
    console.log(`[Reset] Hashing password for admin: ${email}...`);
    const passwordHash = await bcrypt.hash(password, 12);

    try {
        console.log(`[Reset] Upserting admin record...`);
        const admin = await prisma.admin.upsert({
            where: { email },
            update: {
                passwordHash,
                name: 'Admin',
            },
            create: {
                email,
                passwordHash,
                name: 'Admin',
            },
        });
        console.log('✅ Admin credentials reset successfully!');
        console.log(`   Email:    ${admin.email}`);
        console.log(`   Password: ${password}`);
        console.log('\n   You can now login with these credentials.');
    } catch (error) {
        console.error('❌ Error resetting admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
