import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const adminData = await prisma.adminData.findMany({
            select: {
                id: true,
                talent: true,
                individualFee: true,
                groupAFee: true,
                groupBFee: true,
                groupCFee: true
            }
        });

        return NextResponse.json({
            success: true,
            data: adminData
        });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch admin data"
        }, { status: 500 });
    }
}