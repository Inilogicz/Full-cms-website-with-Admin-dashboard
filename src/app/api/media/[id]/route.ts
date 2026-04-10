import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteImage } from '@/lib/cloudinary';

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        const media = await prisma.media.findUnique({ where: { id } });
        if (!media) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        // Delete from Cloudinary
        await deleteImage(media.publicId);

        // Delete from DB
        await prisma.media.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete Media Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
