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
            taxAmount = 0,
            totalAmount = 0,
            isPaid = false,
            paymentId,
            status = isPaid ? 'success' : 'pending',
            groupName,
            memberCount = 0,
            category,
            members = []
        } = await req.json();

        const paymentAmount = typeof charge === 'string' ? parseFloat(charge) || 0 : Number(charge) || 0;
        const tax = typeof taxAmount === 'string' ? parseFloat(taxAmount) || 0 : Number(taxAmount) || 0;
        const total = typeof totalAmount === 'string' ? parseFloat(totalAmount) || 0 : Number(totalAmount) || 0;

        console.log('📦 Incoming Payment Data:', {
            email, name, age, guardianNumber, address, talent, charge, tax, total,
            isPaid, paymentId, status, groupName, memberCount, category, members
        });

        let mainParticipant;
        let allParticipants = [];

        // ✅ Handle Group Category
        if (category === 'Group') {
            if (!members || members.length === 0) {
                return NextResponse.json({
                    success: false,
                    message: "No group members provided.",
                }, { status: 400 });
            }

            const createdMembers = await Promise.all(members.map(async (member) => {
                return await prisma.participant.create({
                    data: {
                        name: member.name || 'Member',
                        email: member.email || '',
                        age: member.age?.toString() || '',
                        address: address || '',
                        number: guardianNumber || '',
                        talent: talent || '',
                        paymentId: paymentId || null
                    }
                });
            }));

            allParticipants = createdMembers;
            mainParticipant = createdMembers[0];
        }

        // ✅ Handle Individual Category
        else {
            let existingParticipant = await prisma.participant.findFirst({
                where: {
                    OR: [
                        { email },
                        { number: guardianNumber }
                    ]
                }
            });

            if (!existingParticipant) {
                mainParticipant = await prisma.participant.create({
                    data: {
                        name: name || '',
                        email: email || '',
                        age: age.toString() || '',
                        address: address || '',
                        number: guardianNumber || '',
                        talent: talent || '',
                        paymentId: paymentId || null // ✅ Assign passed paymentId
                    }
                });
            } else {
                mainParticipant = await prisma.participant.update({
                    where: { id: existingParticipant.id },
                    data: {
                        name: name || existingParticipant.name,
                        age: age ? age.toString() : existingParticipant.age,
                        address: address || existingParticipant.address,
                        number: guardianNumber || existingParticipant.number,
                        talent: talent || existingParticipant.talent,
                        paymentId: paymentId || existingParticipant.paymentId // ✅ Assign if available
                    }
                });
            }

            allParticipants = [mainParticipant];
        }

        // ✅ Create Payment Record
        const payment = await prisma.payment.create({
            data: {
                amount: paymentAmount,
                taxAmount: tax,
                totalAmount: total,
                paymentStatus: status,
                paymentMethod: paymentAmount === 0 ? 'free' : 'razorpay',
                paymentID: paymentId || `manual_${Date.now()}`,
                participantId: mainParticipant.id,
                groupName: category === 'Group' ? groupName || 'Unnamed Group' : null,
                memberCount: category === 'Group' ? memberCount || members.length : null
            }
        });

        return NextResponse.json({
            success: true,
            message: "Payment data saved successfully.",
            data: {
                paymentId: payment.id,
                amount: payment.amount,
                status: payment.paymentStatus,
                paymentID: payment.paymentID,
                groupName: payment.groupName,
                memberCount: payment.memberCount,
                participants: allParticipants
            }
        });

    } catch (e) {
        console.error('❌ Payment processing error:', e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again.",
            error: e instanceof Error ? e.message : 'Unknown error'
        }, { status: 500 });
    }
}
