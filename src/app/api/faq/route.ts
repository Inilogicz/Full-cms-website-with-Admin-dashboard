import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });
        return NextResponse.json(faqs);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const faq = await prisma.fAQ.create({
            data: {
                question: data.question,
                answer: data.answer,
                category: data.category,
                order: data.order || 0,
            },
        });
        return NextResponse.json(faq);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
