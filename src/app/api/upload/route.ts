import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Supports two modes:
// 1. JSON body: { cloudinaryUrl, publicId, altText, width, height, format, bytes }
//    Used when the browser uploads directly to Cloudinary (preferred — no Vercel size limit).
// 2. multipart/form-data with a 'file' field
//    Used as a fallback. Uploads to Cloudinary server-side via unsigned preset.
//    Requires CLOUDINARY_CLOUD_NAME + CLOUDINARY_UPLOAD_PRESET env vars.

export async function POST(req: NextRequest) {
    const contentType = req.headers.get('content-type') || '';

    // ── Mode 1: JSON metadata (browser uploaded directly to Cloudinary) ──────────
    if (contentType.includes('application/json')) {
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
            console.error('Upload save error (JSON mode):', error);
            return NextResponse.json({ error: 'Failed to save media record' }, { status: 500 });
        }
    }

    // ── Mode 2: multipart/form-data — server proxies to Cloudinary ───────────────
    if (contentType.includes('multipart/form-data')) {
        try {
            const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
            const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET?.trim();

            if (!cloudName || !uploadPreset) {
                return NextResponse.json(
                    { error: 'Server-side upload is not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET, or upload directly from the browser.' },
                    { status: 500 }
                );
            }

            const formData = await req.formData();
            const file = formData.get('file') as File | null;
            const altText = (formData.get('altText') as string) || '';

            if (!file || file.size === 0) {
                return NextResponse.json({ error: 'No file provided' }, { status: 400 });
            }

            // Forward the file to Cloudinary using the unsigned preset
            const cloudinaryForm = new FormData();
            cloudinaryForm.append('file', file);
            cloudinaryForm.append('upload_preset', uploadPreset);

            const cloudRes = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { method: 'POST', body: cloudinaryForm }
            );

            if (!cloudRes.ok) {
                const err = await cloudRes.json();
                console.error('Cloudinary upload error (server mode):', err);
                return NextResponse.json(
                    { error: err.error?.message || 'Cloudinary upload failed' },
                    { status: 500 }
                );
            }

            const result = await cloudRes.json();

            const media = await prisma.media.create({
                data: {
                    cloudinaryUrl: result.secure_url,
                    publicId: result.public_id,
                    altText: altText || file.name,
                    width: result.width ?? null,
                    height: result.height ?? null,
                    format: result.format ?? null,
                    bytes: result.bytes ?? null,
                },
            });

            // Return in a shape both old callers (cloudinaryUrl) and new callers understand
            return NextResponse.json({
                ...media,
                cloudinaryUrl: result.secure_url,
                publicId: result.public_id,
            });
        } catch (error) {
            console.error('Upload error (multipart mode):', error);
            return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
        }
    }

    return NextResponse.json(
        { error: `Unsupported content-type: ${contentType}. Use application/json or multipart/form-data.` },
        { status: 415 }
    );
}
