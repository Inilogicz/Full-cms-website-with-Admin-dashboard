import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        stats: {
            products: 5,
            blogPosts: 6,
            events: 3,
            gallery: 12,
            leads: 8,
            subscribers: 42,
        },
        recentLeads: [],
        recentSubscribers: [],
        monthlyLeads: 8,
        monthlySubs: 42,
    });
}
