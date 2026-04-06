import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession, hashPassword } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const users = await prisma.admin.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('Users fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const existing = await prisma.admin.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const passwordHash = await hashPassword(password);

        const user = await prisma.admin.create({
            data: {
                email,
                name,
                passwordHash
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('User creation error:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}
