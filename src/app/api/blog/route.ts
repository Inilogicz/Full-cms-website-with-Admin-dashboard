import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Refreshed
import slugify from 'slugify';

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const slug = slugify(data.title, { lower: true, strict: true });

        const post = await prisma.blogPost.create({
            data: {
                title: data.title,
                slug,
                content: data.content,
                excerpt: data.excerpt,
                category: data.category,
                status: data.status || 'draft',
                featured: data.featured || false,
                featuredImage: data.featuredImage,
                featuredImageResourceType: data.featuredImageResourceType || 'image',
                publishedAt: data.status === 'published' ? new Date() : null,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
