// app/api/checksubmission/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { success: false, message: 'Email is required' },
                { status: 400 }
            );
        }

        // First find the participant
        const participant = await prisma.participant.findFirst({
            where: { email }
        });

        if (!participant) {
            return NextResponse.json(
                { success: false, message: 'Participant not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: participant
        });

    } catch (error) {
        console.error('Error checking submission:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}