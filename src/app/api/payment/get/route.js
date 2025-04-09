import { prisma } from "../../../../lib/prisma"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const extractData = await prisma.payment.findMany({
            include: {
                participant: true,
                registration: {
                    include: {
                        members: true
                    }
                }
            }
        });

        if (extractData) {
            return NextResponse.json({
                success: true,
                data: extractData
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "No payment data found"
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again.'
        });
    }
}