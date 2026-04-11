import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteImage } from '@/lib/cloudinary';

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        const item = await prisma.galleryItem.findUnique({ where: { id } });
        if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        // Delete from Cloudinary if publicId exists
        if (item.publicId) {
            try {
                await deleteImage(item.publicId);
            } catch (err) {
                console.error('Cloudinary delete failed for gallery item:', err);
            }
        }

        await prisma.galleryItem.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete Gallery Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
