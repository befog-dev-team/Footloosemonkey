import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
    try {
        const { amount } = await req.json();

        const options = {
            amount: amount.toString(), // amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            success: true,
            order
        });

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to create payment order'
        }, { status: 500 });
    }
}