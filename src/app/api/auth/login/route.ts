import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
        }

        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const valid = await verifyPassword(password, admin.passwordHash);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = generateToken({ id: admin.id, email: admin.email, name: admin.name });

        const response = NextResponse.json({ success: true, admin: { id: admin.id, email: admin.email, name: admin.name } });
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        return response;
    } catch (error: any) {
        console.error('Login error detailed:', error);
        // Fallback for specific initialization errors to help debugging
        if (error.message?.includes('Prisma Client could not locate the Query Engine')) {
            return NextResponse.json({ error: 'Database initialization error. Please try again in a moment.' }, { status: 500 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
