import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        await prisma.galleryItem.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete Gallery Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
