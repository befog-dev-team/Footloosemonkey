import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            return NextResponse.json({
                success: true,
                message: "Payment verified successfully"
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Invalid signature - payment verification failed"
            }, { status: 400 });
        }

    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to verify payment'
        }, { status: 500 });
    }
}