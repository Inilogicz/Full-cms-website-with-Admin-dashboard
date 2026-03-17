import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { companyName, contactPerson, email, phone, country, distributionInterest, message } = data;

        if (!companyName || !contactPerson || !email || !phone) {
            return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
        }

        const lead = await prisma.distributorLead.create({
            data: { companyName, contactPerson, email, phone, country, distributionInterest, message },
        });

        return NextResponse.json(lead);
    } catch (error) {
        console.error('Lead creation error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const leads = await prisma.distributorLead.findMany({ orderBy: { createdAt: 'desc' } });
        return NextResponse.json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
