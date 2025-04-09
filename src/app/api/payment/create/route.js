import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const requestData = await req.json();

        // Destructure with better defaults
        const {
            email = '',
            name = '',
            age = '',
            guardianNumber = '',
            address = '',
            talent = '',
            charge = 0,
            taxAmount = 0,
            totalAmount = 0,
            isPaid = false,
            paymentId = null,
            status = isPaid ? 'success' : 'pending',
            groupName = '',
            memberCount = 0,
            category = 'Individual', // Default to Individual
            members = []
        } = requestData;

        // Validate required fields for all cases
        if (!guardianNumber) {
            return NextResponse.json({
                success: false,
                message: "Guardian number is required.",
            }, { status: 400 });
        }

        // Convert numeric fields
        const paymentAmount = Number(charge) || 0;
        const tax = Number(taxAmount) || 0;
        const total = Number(totalAmount) || 0;

        console.log('📦 Processing Payment Data:', {
            category, email, name, guardianNumber,
            paymentAmount, paymentId, status
        });

        let mainParticipant;
        let allParticipants = [];

        // Handle Group Registration
        if (category === 'Group') {
            if (!members || members.length === 0) {
                return NextResponse.json({
                    success: false,
                    message: "Group members data is required.",
                }, { status: 400 });
            }

            // Create all group members (always create new records)
            allParticipants = await Promise.all(members.map(async (member) => {
                return await prisma.participant.create({
                    data: {
                        name: member.name || 'Group Member',
                        email: member.email || '',
                        age: member.age?.toString() || '',
                        address: address,
                        number: guardianNumber,
                        talent: talent,
                        paymentId: paymentId
                    }
                });
            }));

            mainParticipant = allParticipants[0];
        }
        // Handle Individual Registration
        else {
            // Validate individual participant data
            if (!name || !email) {
                return NextResponse.json({
                    success: false,
                    message: "Name and email are required for individual registration.",
                }, { status: 400 });
            }

            // Always create new participant record (never update existing)
            mainParticipant = await prisma.participant.create({
                data: {
                    name,
                    email,
                    age: age.toString(),
                    address,
                    number: guardianNumber,
                    talent,
                    paymentId
                }
            });

            allParticipants = [mainParticipant];
        }

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                amount: paymentAmount,
                taxAmount: tax,
                totalAmount: total,
                paymentStatus: status,
                paymentMethod: paymentAmount === 0 ? 'free' : 'razorpay',
                paymentID: paymentId || `manual_${Date.now()}`,
                participantId: mainParticipant.id,
                groupName: category === 'Group' ? groupName : null,
                memberCount: category === 'Group' ? memberCount : null
            }
        });

        return NextResponse.json({
            success: true,
            message: "Registration processed successfully",
            data: {
                paymentId: payment.id,
                participantId: mainParticipant.id,
                paymentStatus: payment.paymentStatus,
                participants: allParticipants.map(p => ({
                    id: p.id,
                    name: p.name,
                    email: p.email
                }))
            }
        });

    } catch (error) {
        console.error('❌ Registration processing error:', error);
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error.message
        }, { status: 500 });
    }
}