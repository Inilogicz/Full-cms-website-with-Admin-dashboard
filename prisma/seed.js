const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const passwordHash = await bcrypt.hash('admin123', 12);
    const admin = await prisma.admin.upsert({
        where: { email: 'admin@nigersanitary.com' },
        update: {},
        create: {
            email: 'admin@nigersanitary.com',
            passwordHash,
            name: 'Admin',
        },
    });
    console.log('✅ Admin user created:', admin.email);

    // Seed products
    const products = [
        { name: 'LadySept Sanitary Towels', slug: 'ladysept-sanitary-towels', description: 'Premium quality sanitary pads designed for maximum comfort, protection, and confidence.', category: 'Feminine Care', applications: 'Daily menstrual protection for women and girls.', packaging: 'Available in packs of 8, 16, and economy packs of 32.', specifications: { Material: 'Super-absorbent polymer core', Sizes: 'Regular, Long, Overnight', Certification: 'NAFDAC Approved' } },
        { name: 'Damson Serviette', slug: 'damson-serviette', description: 'Premium multi-ply napkins perfect for dining, hospitality, and everyday use.', category: 'Hygiene', applications: 'Restaurants, hotels, catering, offices.', packaging: 'Packs of 50, 100. Bulk cartons available.', specifications: { Material: 'Virgin tissue pulp', Ply: '2-ply and 3-ply options' } },
        { name: 'Absorbent Cotton Wool', slug: 'absorbent-cotton-wool', description: 'Medical-grade 100% pure absorbent cotton wool for healthcare applications.', category: 'Medical', applications: 'Wound dressing, medical swabbing, personal care.', packaging: 'Available in 25g, 50g, 100g, 250g, 500g rolls.', specifications: { Material: '100% pure cotton', Grade: 'Medical / Pharmaceutical', Certification: 'NAFDAC & ISO Certified' } },
        { name: 'Damson Underpad', slug: 'damson-underpad', description: 'High-absorbency disposable underpads for patient care and hygiene settings.', category: 'Medical', applications: 'Hospital beds, nursing homes, home care.', packaging: 'Packs of 10, 20. Hospital cartons of 100 units.', specifications: { Sizes: '60x60cm, 60x90cm', Absorbency: '1000-2000ml' } },
        { name: 'Work Floor Underpad', slug: 'work-floor-underpad', description: 'Industrial-grade absorbent pads for workplace spill management.', category: 'Industrial', applications: 'Factory floors, workshops, warehouses.', packaging: 'Packs of 10, 25.', specifications: { Sizes: '60x90cm, 90x120cm', Application: 'Factories, workshops' } },
    ];

    for (const p of products) {
        await prisma.product.upsert({ where: { slug: p.slug }, update: {}, create: { ...p, status: 'published' } });
    }
    console.log('✅ Products seeded');

    // Seed FAQ
    const faqs = [
        { question: 'Are LadySept sanitary pads NAFDAC approved?', answer: 'Yes, all our products are fully NAFDAC registered and approved.', category: 'Products', order: 1 },
        { question: 'How can I become a distributor?', answer: 'Visit our Distributor Inquiry page and fill out the application form.', category: 'Distribution', order: 2 },
        { question: 'What quality certifications do you hold?', answer: 'We hold NAFDAC registration, ISO 9001:2015 certification, and GMP compliance.', category: 'Quality & Safety', order: 3 },
        { question: 'Where is your factory located?', answer: 'Our facility is located in Niger State, Nigeria.', category: 'Company', order: 4 },
    ];

    for (const f of faqs) {
        await prisma.fAQ.create({ data: f });
    }
    console.log('✅ FAQs seeded');

    console.log('🎉 Seeding complete!');
    console.log('');
    console.log('Admin Login Credentials:');
    console.log('  Email: admin@nigersanitary.com');
    console.log('  Password: admin123');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
