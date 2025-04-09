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
        const registration = await prisma.registration.findFirst({
            where: {
                OR: [
                    { email },
                    { members: { some: { email } } }
                ],
                Payment: {
                    some: {
                        paymentID: paymentId,
                        paymentStatus: 'SUCCESS'
                    }
                }
            },
            include: {
                Payment: {
                    where: {
                        paymentID: paymentId
                    },
                    take: 1
                },
                members: true
            }
        });

        if (!registration || !registration.Payment.length) {
            return NextResponse.json(
                { error: 'Group payment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            registration,
            payment: registration.Payment[0]
        });
    } catch (error) {
        console.error('Error verifying group payment:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}