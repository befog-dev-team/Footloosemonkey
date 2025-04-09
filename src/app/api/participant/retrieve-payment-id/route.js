import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, phoneNumber } = await req.json();

        if (!email || !phoneNumber) {
            return NextResponse.json(
                { success: false, error: 'Email and phone number are required' },
                { status: 400 }
            );
        }

        // Find participant with matching email and phone number
        const participant = await prisma.participant.findFirst({
            where: {
                email: email,
                number: phoneNumber
            },
            select: {
                paymentId: true,
                name: true
            }
        });

        if (!participant || !participant.paymentId) {
            return NextResponse.json(
                { success: false, error: 'No payment ID found for the provided details' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            paymentId: participant.paymentId,
            participantName: participant.name
        });

    } catch (error) {
        console.error('Error retrieving payment ID:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}