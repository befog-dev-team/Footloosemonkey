import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId, videoId } = await req.json();

    // Check if the user has already voted on this submission
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_submissionId: {
          userId,
          submissionId: videoId,
        },
      },
    });

    let voteCountChange;
    let isVoted;

    if (existingVote) {
      // If the user has already voted, we delete the vote and decrement the count
      await prisma.$transaction(async (prisma) => {
        await prisma.vote.delete({
          where: { id: existingVote.id },
        });
        await prisma.submission.update({
          where: { id: videoId },
          data: { voteCount: { decrement: 1 } },
        });
      });
      voteCountChange = -1;
      isVoted = false;
    } else {
      // If the user has not voted, we add the vote and increment the count
      await prisma.$transaction(async (prisma) => {
        await prisma.vote.create({
          data: { userId, submissionId: videoId },
        });
        await prisma.submission.update({
          where: { id: videoId },
          data: { voteCount: { increment: 1 } },
        });
      });
      voteCountChange = 1;
      isVoted = true;
    }

    return NextResponse.json({
      success: true,
      isVoted,
      voteCountChange,
    });

  } catch (error) {
    console.error("Error toggling vote:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to toggle vote"
    }, { status: 500 });
  }
}