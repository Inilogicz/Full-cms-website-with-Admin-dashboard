import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Accepts JSON metadata from a browser-side Cloudinary upload.
// Files are uploaded directly browser → Cloudinary (unsigned preset) to avoid
// Vercel's 4.5 MB serverless payload limit. Only the resulting metadata is sent here.
export async function POST(req: NextRequest) {
    const contentType = req.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
        return NextResponse.json(
            {
                error: 'This endpoint only accepts JSON metadata. Upload the file directly to Cloudinary from the browser, then POST the resulting URL and metadata here.',
                hint: 'content-type must be application/json',
            },
            { status: 415 }
        );
    }

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
                width: width ?? null,
                height: height ?? null,
                format: format ?? null,
                bytes: bytes ?? null,
            },
        });

        return NextResponse.json(media);
    } catch (error) {
        console.error('Upload save error:', error);
        return NextResponse.json({ error: 'Failed to save media record' }, { status: 500 });
    }
}
