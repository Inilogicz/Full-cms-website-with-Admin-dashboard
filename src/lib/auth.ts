import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'niger-sanitary-secret-key-change-in-production';
const TOKEN_EXPIRY = '7d';

export interface AdminPayload {
    id: string;
    email: string;
    name: string;
}

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export function generateToken(payload: AdminPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): AdminPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as AdminPayload;
    } catch {
        return null;
    }
}

export async function getSession(): Promise<AdminPayload | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token')?.value;
        if (!token) return null;
        return verifyToken(token);
    } catch (error) {
        console.error('getSession error:', error);
        return null;
    }
}

export async function requireAuth(): Promise<AdminPayload> {
    const session = await getSession();
    if (!session) {
        throw new Error('Unauthorized');
    }
    return session;
}
