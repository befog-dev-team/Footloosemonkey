import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const paymentId = searchParams.get('paymentId');

    console.log('Verifying payment:', { email, paymentId });

    if (!email || !paymentId) {
        return NextResponse.json(
            { error: 'Email and Payment ID are required' },
            { status: 400 }
        );
    }

    try {
        // First check if participant exists
        const participantExists = await prisma.participant.findFirst({
            where: { email }
        });
        console.log('Participant exists:', !!participantExists);

        // Then check if payment exists
        const paymentExists = await prisma.payment.findFirst({
            where: { paymentID: paymentId }
        });
        console.log('Payment exists:', !!paymentExists);

        // Then run the full query
        const participant = await prisma.participant.findFirst({
            where: {
                email,
                payments: {
                    some: {
                        paymentID: paymentId,
                        paymentStatus: 'SUCCESS'
                    }
                }
            },
            include: {
                payments: {
                    where: {
                        paymentID: paymentId
                    },
                    take: 1
                }
            }
        });

        console.log('Query result:', participant);

        if (!participant) {
            console.log('No participant found with matching criteria');
            return NextResponse.json(
                { error: 'Participant not found with this payment' },
                { status: 404 }
            );
        }

        if (!participant.payments.length) {
            console.log('Participant found but no matching payments');
            return NextResponse.json(
                { error: 'Payment not found for this participant' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            participant,
            payment: participant.payments[0]
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}