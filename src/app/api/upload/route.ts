import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const altText = formData.get('altText') as string;

        if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

        // Convert file to base64, then upload to Cloudinary
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

        const result = await uploadImage(base64);

        // Save to DB
        const media = await prisma.media.create({
            data: {
                cloudinaryUrl: result.url,
                publicId: result.publicId,
                altText: altText || file.name,
                width: result.width,
                height: result.height,
                format: result.format,
                bytes: result.bytes,
            },
        });

        return NextResponse.json(media);
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
