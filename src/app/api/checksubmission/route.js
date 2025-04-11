import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const paymentId = searchParams.get('paymentId');

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        // First find the participant by email
        const participant = await prisma.participant.findFirst({
            where: {
                email: { equals: email, mode: 'insensitive' },
                ...(paymentId && { paymentId }) // Optional paymentId filter
            },
            select: { id: true }
        });

        console.log("Participant found:", participant);

        if (!participant) {
            return NextResponse.json({
                success: false,
                message: "No participant found with this email"
            }, { status: 404 });
        }

        // Then check for submissions using the participant's ID
        const existingSubmission = await prisma.submission.findFirst({
            where: {
                participantId: participant.id
            },
            include: {
                participant: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        talent: true
                    }
                }
            }
        });

        if (existingSubmission) {
            return NextResponse.json({
                success: true,
                message: "User has an existing submission",
                data: {
                    submissionId: existingSubmission.id,
                    publicId: existingSubmission.publicId,
                    postTitle: existingSubmission.postTitle,
                    participant: existingSubmission.participant,
                    createdAt: existingSubmission.createdAt
                }
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "No submission found for this user",
                data: {
                    participant: {
                        id: participant.id,
                        email: email
                    }
                }
            });
        }
    } catch (error) {
        console.error("Error checking submission:", error);
        return NextResponse.json({
            error: "Internal server error",
            success: false
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}