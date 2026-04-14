import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// This route now only saves Cloudinary metadata to the DB.
// The actual file upload happens directly from the browser to Cloudinary
// using an unsigned upload preset — bypassing Vercel's 4.5MB payload limit.
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { cloudinaryUrl, publicId, altText, width, height, format, bytes } = data;

        if (!cloudinaryUrl || !publicId) {
            return NextResponse.json({ error: 'Missing cloudinaryUrl or publicId' }, { status: 400 });
        }

        const media = await prisma.media.create({
            data: {
                cloudinaryUrl,
                publicId,
                altText: altText || '',
                width: width || null,
                height: height || null,
                format: format || null,
                bytes: bytes || null,
            },
        });

        return NextResponse.json(media);
    } catch (error) {
        console.error('Upload save error:', error);
        return NextResponse.json({ error: 'Failed to save media record' }, { status: 500 });
    }
}
