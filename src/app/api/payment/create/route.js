import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const {
            email,
            name,
            age = '',
            guardianNumber,
            address,
            talent,
            charge = 0,
            isPaid = false,
            paymentId,
            status = isPaid ? 'success' : 'pending',
            groupName,
            memberCount = 0,
            category,
            members = []
        } = await req.json();

        const paymentAmount = typeof charge === 'string' ?
            parseFloat(charge) || 0 :
            Number(charge) || 0;

        let registrationId = null;
        let participantIds = []; // Changed to array for multiple participants

        // Handle Group Registration
        if (category === 'Group') {
            // Create the group registration
            const registration = await prisma.registration.create({
                data: {
                    category,
                    groupName: groupName || 'Unnamed Group',
                    email: email || '',
                    name: name || '',
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

            // Create participants for each member and collect their IDs
            participantIds = await Promise.all(members.map(async (member) => {
                const participant = await prisma.participant.create({
                    data: {
                        name: member.name || 'Member',
                        email: member.email || '',
                        age: age || '',
                        address: address || '',
                        number: guardianNumber || '',
                        talent: talent || ''
                    }
                });
                return participant.id;
            }));
        }
        // Handle Individual Registration
        else {
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
            participantIds = [participant.id]; // Still use array for consistency
        }

        // Create main payment record
        const payment = await prisma.payment.create({
            data: {
                ...(registrationId && { registrationId }),
                amount: paymentAmount,
                paymentStatus: status,
                paymentID: paymentId || `manual_${Date.now()}`,
                ...(category === 'Group' && {
                    groupName: groupName || '',
                    memberCount: memberCount || 0
                }),
                // Connect participants using the many-to-many relation
                participants: {
                    connect: participantIds.map(id => ({ id }))
                }
            },
            include: {
                participants: true, // Changed from 'participant' to 'participants'
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