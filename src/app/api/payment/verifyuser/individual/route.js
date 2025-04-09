import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const paymentId = searchParams.get('paymentId');

    if (!email || !paymentId) {
        return NextResponse.json(
            { error: 'Email and Payment ID are required' },
            { status: 400 }
        );
    }

    try {
        const participant = await prisma.participant.findFirst({
            where: {
                email,
                payments: {
                    some: {
                        paymentID: paymentId,
                        paymentStatus: 'success'
                    }
                }
            },
            include: {
                payments: {
                    where: {
                        paymentID: paymentId,
                        paymentStatus: 'success'
                    },
                    take: 1
                }
            }
        });

        if (!participant) {
            return NextResponse.json(
                { error: 'No participant found with this email and payment ID' },
                { status: 404 }
            );
        }

        if (!participant.payments || participant.payments.length === 0) {
            return NextResponse.json(
                { error: 'Payment not found or not successful' },
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