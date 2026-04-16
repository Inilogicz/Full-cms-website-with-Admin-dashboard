import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        const post = await prisma.blogPost.findUnique({ where: { id } });
        if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(post);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        const data = await req.json();
        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                title: data.title,
                content: data.content,
                excerpt: data.excerpt,
                category: data.category,
                status: data.status,
                featured: data.featured,
                featuredImage: data.featuredImage,
                featuredImageResourceType: data.featuredImageResourceType,
                publishedAt: data.status === 'published' ? new Date() : undefined,
            },
        });
        return NextResponse.json(post);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        await prisma.blogPost.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
