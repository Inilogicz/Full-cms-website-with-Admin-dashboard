import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const store = await prisma.store.findUnique({
            where: { id },
        });

        if (!store) {
            return NextResponse.json({ error: 'Store not found' }, { status: 404 });
        }

        return NextResponse.json(store);
    } catch (error) {
        console.error('Error fetching store:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await req.json();
        const store = await prisma.store.update({
            where: { id },
            data: {
                name: data.name,
                address: data.address,
                city: data.city,
                state: data.state,
                phone: data.phone,
                email: data.email,
                status: data.status,
            },
        });

        return NextResponse.json(store);
    } catch (error) {
        console.error('Error updating store:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.store.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Store deleted successfully' });
    } catch (error) {
        console.error('Error deleting store:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
