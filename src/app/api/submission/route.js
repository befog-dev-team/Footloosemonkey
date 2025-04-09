// app/api/submission/route.ts
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request) {
    try {
        const formData = await request.formData();

        // Extract all form fields
        const participantId = formData.get('participantId');
        const name = formData.get('name');
        const participantEmail = formData.get('participantEmail');
        const age = formData.get('age');
        const ageCriteria = formData.get('ageCriteria');
        const participantTalent = formData.get('participantTalent');
        const postTitle = formData.get('postTitle');
        const description = formData.get('description');
        const participantAddress = formData.get('participantAddress');
        const participantNumber = formData.get('participantNumber');
        const participantCharge = formData.get('participantCharge');
        const participantPaymentID = formData.get('participantPaymentID');
        const participantPaymentStatus = formData.get('participantPaymentStatus');
        const videoFile = formData.get('file');
        const profileFile = formData.get('profilepic');

        // Validate required fields
        if (!participantId || !participantEmail || !postTitle || !description) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!videoFile || !profileFile) {
            return NextResponse.json(
                { success: false, error: 'Both video and profile picture are required' },
                { status: 400 }
            );
        }

        // Upload files to Cloudinary
        const uploadToCloudinary = (file, resourceType, folder) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: resourceType,
                        folder: folder,
                        ...(resourceType === 'video' ? {
                            eager: [{ width: 1920, height: 1080, crop: "scale", quality: "auto", fetch_format: "mp4" }],
                            eager_async: true
                        } : {
                            transformation: [{ quality: "auto", fetch_format: "jpg" }]
                        })
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                const reader = file.stream().getReader();
                const chunks = [];

                reader.read().then(function process({ done, value }) {
                    if (done) {
                        uploadStream.end(Buffer.concat(chunks));
                        return;
                    }
                    chunks.push(value);
                    return reader.read().then(process);
                });
            });
        };

        // Upload both files in parallel
        const [videoResult, profileResult] = await Promise.all([
            uploadToCloudinary(videoFile, 'video', 'footloosemonkey-next-cloudinary-uploads/videos'),
            uploadToCloudinary(profileFile, 'image', 'footloosemonkey-next-cloudinary-uploads/profilepics')
        ]);

        // Create submission in database
        const submission = await prisma.submission.create({
            data: {
                publicId: videoResult.public_id,
                postTitle: postTitle,
                description: description,
                video: videoResult.secure_url,
                profilepic: profileResult.secure_url,
                duration: videoResult.duration || 0,
                originalSize: String(videoFile.size),
                compressedSize: String(videoResult.bytes),
                ageCriteria: ageCriteria || '',
                participant: {
                    connect: { id: participantId }
                }
            },
            include: {
                participant: true
            }
        });

        return NextResponse.json({
            success: true,
            data: submission
        });

    } catch (error) {
        console.error('Upload failed:', error);
        return NextResponse.json(
            { success: false, error: 'Upload failed', details: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}