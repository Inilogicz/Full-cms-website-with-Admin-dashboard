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

    // Seed Events
    const events = [
        {
            title: 'Annual Community Health Outreach 2025',
            slug: 'annual-community-health-outreach-2025',
            description: 'Our annual commitment to the wellbeing of our host community, providing free health screenings and hygiene education.',
            eventDate: new Date('2025-05-15'),
            location: 'Minna, Niger State',
            category: 'Community',
            status: 'published'
        },
        {
            title: 'New Production Line Inauguration',
            slug: 'new-production-line-inauguration',
            description: 'Official opening of our state-of-the-art automated production facility for LadySept sanitary towels.',
            eventDate: new Date('2025-02-10'),
            location: 'Factory Complex',
            category: 'Factory',
            status: 'published'
        },
        {
            title: 'ISO Certification Celebration',
            slug: 'iso-certification-celebration',
            description: 'Celebrating our achievement of ISO 9001:2015 certification for quality management systems.',
            eventDate: new Date('2024-11-20'),
            location: 'Corporate HQ',
            category: 'Quality',
            status: 'published'
        }
    ];

    for (const e of events) {
        const createdEvent = await prisma.event.upsert({
            where: { slug: e.slug },
            update: {},
            create: e
        });

        // Add a placeholder image for each event
        await prisma.media.upsert({
            where: { publicId: `event-${createdEvent.slug}` },
            update: { eventId: createdEvent.id },
            create: {
                publicId: `event-${createdEvent.slug}`,
                cloudinaryUrl: `https://images.unsplash.com/photo-1540575861501-7ce0e220bed7?auto=format&fit=crop&q=80&w=800`,
                altText: createdEvent.title,
                eventId: createdEvent.id
            }
        });
    }
    console.log('✅ Events seeded with images');

    // Seed Gallery Items
    const galleryItems = [
        { caption: 'Automated Production Line in full operation', category: 'Factory', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' },
        { caption: 'Our dedicated quality assurance team at work', category: 'Quality', imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800' },
        { caption: 'Modern packaging systems for LadySept products', category: 'Packaging', imageUrl: 'https://images.unsplash.com/photo-1620014134773-4d54244e9ed1?auto=format&fit=crop&q=80&w=800' },
        { caption: 'Community hygiene workshop participants', category: 'Community', imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800' },
        { caption: 'Showcasing our complete product range', category: 'Products', imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800' },
        { caption: 'Our skilled technicians during training', category: 'Team', imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800' },
        { caption: 'Precision testing in our NAFDAC certified lab', category: 'Quality', imageUrl: 'https://images.unsplash.com/photo-1579154273821-ad99159f50e5?auto=format&fit=crop&q=80&w=800' },
        { caption: 'Factory aerial view showing our expansion', category: 'Factory', imageUrl: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=800' },
    ];

    for (const g of galleryItems) {
        await prisma.galleryItem.create({ data: g });
    }
    console.log('✅ Gallery items seeded');

    // Seed Blog Posts
    const blogPosts = [
        {
            title: 'Modernizing Menstrual Hygiene in Nigeria',
            slug: 'modernizing-menstrual-hygiene-in-nigeria',
            content: 'At Niger Sanitary Industry Limited, we are committed to providing high-quality sanitary solutions that empower women and girls across the nation. Our latest production technology ensures maximum absorbency and comfort...',
            excerpt: 'Exploring the impact of modern manufacturing on the accessibility of quality menstrual hygiene products.',
            category: 'Hygiene Tips',
            status: 'published',
            featured: true,
            featuredImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
            publishedAt: new Date('2025-03-01')
        },
        {
            title: 'Expanding Our Reach: New Distribution Hubs in 2025',
            slug: 'expanding-our-reach-new-distribution-hubs-2025',
            content: 'To better serve our customers, we are excited to announce the opening of three new distribution centers across the northern region. This expansion will significantly reduce lead times and ensure LadySept products are always available...',
            excerpt: 'Company expansion updates and our commitment to statewide availability.',
            category: 'Company News',
            status: 'published',
            featured: false,
            featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad86d7c71822?auto=format&fit=crop&q=80&w=800',
            publishedAt: new Date('2025-02-15')
        },
        {
            title: 'The Science Behind LadySept Absorbency',
            slug: 'the-science-behind-ladysept-absorbency',
            content: 'Our R&D team has been working tirelessly to enhance the core technology of our sanitary towels. By utilizing advanced multi-layer polymer structures, we have achieved a 30% increase in quick-dry performance...',
            excerpt: 'An inside look at the materials and technology that make our products superior.',
            category: 'Product Innovation',
            status: 'published',
            featured: true,
            featuredImage: 'https://images.unsplash.com/photo-1532187875605-186c7141064b?auto=format&fit=crop&q=80&w=800',
            publishedAt: new Date('2025-01-20')
        }
    ];

    for (const b of blogPosts) {
        await prisma.blogPost.upsert({
            where: { slug: b.slug },
            update: {},
            create: b
        });
    }
    console.log('✅ Blog posts seeded');

    console.log('🎉 Seeding complete!');
    console.log('');
    console.log('Admin Login Credentials:');
    console.log('  Email: admin@nigersanitary.com');
    console.log('  Password: admin123');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
