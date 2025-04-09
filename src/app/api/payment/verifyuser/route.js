import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    console.log('Verification request received:', request.url);
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const paymentId = searchParams.get('paymentId');

    console.log('Verification request for:', email);

    if (!email || !paymentId) {
        return NextResponse.json(
            { error: 'Email and paymentId are required' },
            { status: 400 }
        );
    }

    try {
        const participant = await prisma.participant.findFirst({
            where: {
                email: email,
                paymentId: paymentId,
            },
            include: {
                payments: true,
                submissions: true, // Include submissions if needed
            },
        });

        if (!participant) {
            return NextResponse.json(
                { error: 'Participant not found with provided email and payment ID' },
                { status: 404 }
            );
        }

        // Don't return sensitive data
        const { payments, submissions, ...safeParticipant } = participant;

        return NextResponse.json(
            {
                participant: safeParticipant,
                hasPayment: payments.length > 0,
                hasSubmission: submissions.length > 0
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Verification error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}