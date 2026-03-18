import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import slugify from 'slugify';

export async function GET() {
    try {
        const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' }, include: { images: true } });
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const slug = slugify(data.name, { lower: true, strict: true });

        const product = await prisma.product.create({
            data: {
                name: data.name,
                slug,
                description: data.description,
                specifications: data.specifications,
                category: data.category,
                applications: data.applications,
                packaging: data.packaging,
                status: data.status || 'published',
                images: data.imageIds ? {
                    connect: data.imageIds.map((id: string) => ({ id }))
                } : undefined
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
