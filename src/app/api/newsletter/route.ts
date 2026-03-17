import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

        const existing = await prisma.subscriber.findUnique({ where: { email } });
        if (existing) return NextResponse.json({ message: 'Already subscribed' });

        await prisma.subscriber.create({ data: { email } });
        return NextResponse.json({ message: 'Subscribed successfully' });
    } catch (error) {
        console.error('Newsletter error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } });
        return NextResponse.json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
