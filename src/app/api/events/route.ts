import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const events = await prisma.event.findMany({ orderBy: { eventDate: 'desc' }, include: { images: true } });
        return NextResponse.json(events);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const event = await prisma.event.create({
            data: {
                title: data.title,
                slug,
                description: data.description,
                eventDate: new Date(data.eventDate),
                location: data.location,
                category: data.category,
                status: data.status || 'published',
                images: data.imageIds ? {
                    connect: data.imageIds.map((id: string) => ({ id }))
                } : undefined
            },
        });
        return NextResponse.json(event);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
