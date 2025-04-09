"use server"

import { PrismaClient } from "@prisma/client"

export const fetchAllSubmission = async () => {
    const prisma = new PrismaClient()

    try {
        // Fetch all submissions
        const response = await prisma.submission.findMany({
            include: {
                participant: true
            }
        })
        return response
    } catch (error) {
        console.error(error)
    } finally {
        prisma.$disconnect()
    }
}

export const fetchLeaderboard = async () => {
    const prisma = new PrismaClient();

    try {
        // Fetch top 10 submissions by vote count with participant data
        const leaderboard = await prisma.submission.findMany({
            orderBy: {
                voteCount: 'desc'
            },
            take: 10,
            select: {
                id: true,
                participantId: true,
                profilepic: true,
                voteCount: true,
                createdAt: true,
                participant: {
                    select: {
                        name: true,
                        talent: true
                    }
                }
            }
        });

        console.log("leaderboard data", leaderboard);

        // Transform the data to match your frontend expectations
        return leaderboard.map(item => ({
            ...item,
            name: item.participant?.name || 'Unknown',
            participantTalent: item.participant?.talent || 'Not specified'
        }));
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
};