import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        const data = await req.json();
        const event = await prisma.event.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
                location: data.location,
                category: data.category,
                status: data.status,
            },
        });
        return NextResponse.json(event);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        await prisma.event.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
