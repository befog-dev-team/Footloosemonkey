import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        // Extract data from the request body
        const {
            email,
            name,
            age,
            guardianNumber,
            address,
            talent,
            charge,
            isPaid,
            paymentId,
            status,
            groupName,
            memberCount,
            category
        } = await req.json();

        // Convert charge to number if it's a string
        const paymentAmount = typeof charge === 'string' ? parseFloat(charge) : charge;

        // First, find or create the participant
        // First try to find the participant
        let participant = await prisma.participant.findFirst({
            where: { email }
        });

        // If not found, create
        if (!participant) {
            participant = await prisma.participant.create({
                data: {
                    name,
                    email,
                    age: age.toString(),
                    address,
                    number: guardianNumber,
                    talent,
                }
            });
        }
        // If found, update
        else {
            participant = await prisma.participant.update({
                where: { id: participant.id },
                data: {
                    name,
                    age: age.toString(),
                    address,
                    number: guardianNumber,
                    talent,
                }
            });
        }

        // For group registrations, create a registration record
        if (category === 'Group') {
            await prisma.registration.create({
                data: {
                    category,
                    groupName: groupName || '',
                    guardianNumber,
                    address,
                    talent,
                    charge: paymentAmount.toString(),
                    videoSharing: false, // Set defaults
                    offensiveContent: false,
                    incident: false,
                    members: {
                        create: Array.from({ length: memberCount || 0 }).map(() => ({
                            name: 'Member Name', // You should get these from the request
                            email: 'member@example.com' // You should get these from the request
                        }))
                    }
                }
            });
        }

        // Create the payment record
        const payment = await prisma.payment.create({
            data: {
                participantId: participant.id,
                amount: paymentAmount,
                paymentStatus: status || (isPaid ? 'success' : 'pending'),
                paymentID: paymentId,
            },
            include: {
                participant: true
            }
        });

        return NextResponse.json({
            success: true,
            message: "Payment data saved successfully.",
            data: payment
        });

    } catch (e) {
        console.error('Payment processing error:', e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again.",
            error: e instanceof Error ? e.message : 'Unknown error'
        }, { status: 500 });
    }
}