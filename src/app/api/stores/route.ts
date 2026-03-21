import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const state = searchParams.get('state');
        const city = searchParams.get('city');

        const where: { status?: string; state?: string; city?: string } = { status: 'published' };
        if (state) where.state = state;
        if (city) where.city = city;

        // If it's an admin request (we can check for a header or just return all for simplicity in this dev environment)
        const isAdmin = req.headers.get('x-admin-request') === 'true';
        if (isAdmin) delete where.status;

        const stores = await prisma.store.findMany({
            where,
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const store = await prisma.store.create({
            data: {
                name: data.name,
                address: data.address,
                city: data.city,
                state: data.state,
                phone: data.phone,
                email: data.email,
                status: data.status || 'published',
            },
        });
        return NextResponse.json(store);
    } catch (error) {
        console.error('Error creating store:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
