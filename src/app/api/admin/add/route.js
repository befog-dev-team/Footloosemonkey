import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const { id, talent, offerCharge, groupACharge, groupBCharge, groupCCharge } = await req.json();

        // Check if the document with the given id exists
        const existingEntry = await prisma.adminData.findUnique({
            where: { id }
        });

        if (existingEntry) {
            // Update existing entry
            const updatedEntry = await prisma.adminData.update({
                where: { id },
                data: {
                    talent,
                    offerCharge,
                    groupACharge,
                    groupBCharge,
                    groupCCharge
                }
            });

            return NextResponse.json({
                success: true,
                message: "Data Updated Successfully.",
                data: updatedEntry
            });
        } else {
            // Create new entry
            const newEntry = await prisma.adminData.create({
                data: {
                    talent,
                    offerCharge,
                    groupACharge,
                    groupBCharge,
                    groupCCharge
                }
            });

            return NextResponse.json({
                success: true,
                message: "Data Saved Successfully.",
                data: newEntry
            });
        }
    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again."
        }, { status: 500 });
    }
}