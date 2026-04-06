import { prisma } from '@/lib/prisma';
import AboutClient from '@/components/about/AboutClient';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    // Fetch about/home configuration on the server
    const settings = await prisma.homeConfig.findUnique({
        where: { id: 'global' }
    });

    return (
        <AboutClient settings={settings} />
    );
}
