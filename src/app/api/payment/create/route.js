import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        // Extract data from the request body with proper defaults
        const {
            email,
            name,
            age = '', // Provide default empty string if undefined
            guardianNumber,
            address,
            talent,
            charge = 0, // Default to 0 if undefined
            isPaid = false,
            paymentId,
            status = isPaid ? 'success' : 'pending',
            groupName,
            memberCount = 0,
            category,
            members = [] // Array of group members {name, email}
        } = await req.json();

        // Convert charge to number safely
        const paymentAmount = typeof charge === 'string' ?
            parseFloat(charge) || 0 :
            Number(charge) || 0;

        // For group registrations, create registration record first
        let registrationId = null;
        if (category === 'Group') {
            const registration = await prisma.registration.create({
                data: {
                    category,
                    groupName: groupName || 'Unnamed Group',
                    email: email || '', // Group contact email
                    name: name || '', // Group contact name
                    guardianNumber: guardianNumber || '',
                    address: address || '',
                    talent: talent || '',
                    charge: paymentAmount.toString(),
                    videoSharing: false,
                    offensiveContent: false,
                    incident: false,
                    members: {
                        create: members.map(member => ({
                            name: member.name || 'Member',
                            email: member.email || ''
                        }))
                    }
                }
            });
            registrationId = registration.id;
        }

        // For individual participants, find or create participant record
        let participantId = null;
        if (category !== 'Group') {
            let participant = await prisma.participant.findFirst({
                where: {
                    OR: [
                        { email },
                        { number: guardianNumber }
                    ]
                }
            });

            if (!participant) {
                participant = await prisma.participant.create({
                    data: {
                        name: name || '',
                        email: email || '',
                        age: age.toString() || '',
                        address: address || '',
                        number: guardianNumber || '',
                        talent: talent || '',
                    }
                });
            } else {
                participant = await prisma.participant.update({
                    where: { id: participant.id },
                    data: {
                        name: name || participant.name,
                        age: age ? age.toString() : participant.age,
                        address: address || participant.address,
                        number: guardianNumber || participant.number,
                        talent: talent || participant.talent,
                    }
                });
            }
            participantId = participant.id;
        }

        // Create the payment record
        const payment = await prisma.payment.create({
            data: {
                ...(participantId && { participantId }), // Only include if exists
                ...(registrationId && { registrationId }), // Only include if exists
                amount: paymentAmount,
                paymentStatus: status,
                paymentID: paymentId || `manual_${Date.now()}`,
                ...(category === 'Group' && {
                    groupName: groupName || '',
                    memberCount: memberCount || 0
                })
            },
            include: {
                participant: true,
                registration: {
                    include: {
                        members: true
                    }
                }
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