import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Refreshed

export async function GET() {
    try {
        const items = await prisma.galleryItem.findMany({ orderBy: { order: 'asc' } });
        return NextResponse.json(items);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const item = await prisma.galleryItem.create({
            data: {
                caption: data.caption,
                category: data.category,
                imageUrl: data.imageUrl,
                publicId: data.publicId,
                resourceType: data.resourceType || data.type || 'image',
                order: data.order || 0,
            } as any,
        });
        return NextResponse.json(item);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
