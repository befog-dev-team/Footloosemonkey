import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const data = await request.json();

        // Create registration
        const registration = await prisma.registration.create({
            data: {
                category: data.category,
                groupName: data.groupName || null,
                email: data.email || null,
                name: data.name || null,
                age: data.age ? parseInt(data.age) : null,
                guardianNumber: data.guardianNumber,
                address: data.address,
                talent: data.talent,
                charge: data.charge,
                videoSharing: data.termsAccepted.videoSharing,
                offensiveContent: data.termsAccepted.offensiveContent,
                incident: data.termsAccepted.incident,
                members: data.members ? {
                    create: data.members.map(member => ({
                        name: member.name,
                        email: member.email
                    }))
                } : undefined
            },
            include: {
                members: true
            }
        });

        // Set cookie
        cookies().set('isRegistered', 'true', {
            maxAge: 24 * 60 * 60, // 1 day
            path: '/'
        });

        return NextResponse.json({
            success: true,
            data: registration
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({
            success: false,
            message: error.message || "Registration failed"
        }, { status: 500 });
    }
}