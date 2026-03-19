import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const [
            productCount,
            blogCount,
            eventCount,
            galleryCount,
            leadCount,
            subscriberCount,
            recentLeads,
            recentSubscribers,
        ] = await Promise.all([
            prisma.product.count(),
            prisma.blogPost.count(),
            prisma.event.count(),
            prisma.galleryItem.count(),
            prisma.distributorLead.count(),
            prisma.subscriber.count(),
            prisma.distributorLead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
            prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
        ]);

        return NextResponse.json({
            stats: {
                products: productCount,
                blogPosts: blogCount,
                events: eventCount,
                gallery: galleryCount,
                leads: leadCount,
                subscribers: subscriberCount,
            },
            recentLeads,
            recentSubscribers,
            monthlyLeads: leadCount,
            monthlySubs: subscriberCount,
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
