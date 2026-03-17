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

        // Monthly lead data (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyLeads = await prisma.distributorLead.groupBy({
            by: ['createdAt'],
            where: { createdAt: { gte: sixMonthsAgo } },
        });

        const monthlySubs = await prisma.subscriber.groupBy({
            by: ['createdAt'],
            where: { createdAt: { gte: sixMonthsAgo } },
        });

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
            monthlyLeads: monthlyLeads.length,
            monthlySubs: monthlySubs.length,
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        // Return mock data if DB not connected
        return NextResponse.json({
            stats: { products: 5, blogPosts: 6, events: 5, gallery: 9, leads: 12, subscribers: 45 },
            recentLeads: [],
            recentSubscribers: [],
            monthlyLeads: 0,
            monthlySubs: 0,
        });
    }
}
