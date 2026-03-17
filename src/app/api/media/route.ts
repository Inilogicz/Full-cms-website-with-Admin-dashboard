import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const media = await prisma.media.findMany({ orderBy: { uploadedAt: 'desc' } });
        return NextResponse.json(media);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const media = await prisma.media.create({
            data: {
                cloudinaryUrl: data.cloudinaryUrl,
                publicId: data.publicId,
                altText: data.altText,
                width: data.width,
                height: data.height,
                format: data.format,
                bytes: data.bytes,
            },
        });
        return NextResponse.json(media);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
