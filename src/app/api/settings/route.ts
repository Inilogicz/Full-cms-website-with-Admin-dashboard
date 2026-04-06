import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        let settings = await prisma.homeConfig.findUnique({
            where: { id: 'global' }
        });

        if (!settings) {
            // Initialize if not exists
            settings = await prisma.homeConfig.create({
                data: { id: 'global' }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Settings fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id, updatedAt, ...rest } = await req.json();
        
        const settings = await prisma.homeConfig.upsert({
            where: { id: 'global' },
            update: rest,
            create: { id: 'global', ...rest }
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Settings update error:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
