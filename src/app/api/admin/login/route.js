import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        console.log("Email: ", email, "Password: ", password);

        // Find admin by email
        const admin = await prisma.admin.findUnique({
            where: { email }
        });

        if (!admin) {
            return NextResponse.json({
                success: false,
                message: "Invalid Email! Please try again."
            }, { status: 401 });
        }

        // Compare passwords
        const passwordMatch = password === admin.password; // Without hashing for simplicity

        if (!passwordMatch) {
            return NextResponse.json({
                success: false,
                message: "Invalid Password! Please try again."
            }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            message: "Login Successful."
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again."
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}