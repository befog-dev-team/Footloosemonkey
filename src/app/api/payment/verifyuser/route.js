import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request) {
    console.log('Hit Api...');
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
        // Check individual first
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

        if (participant?.payments?.length) {
            return NextResponse.json({
                type: 'individual',
                data: participant,
                payment: participant.payments[0]
            });
        }

        // Check group if individual not found
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

        if (registration?.Payment?.length) {
            return NextResponse.json({
                type: 'group',
                data: registration,
                payment: registration.Payment[0]
            });
        }

        return NextResponse.json(
            { error: 'Payment not found' },
            { status: 404 }
        );
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}