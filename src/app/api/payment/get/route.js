import Payment from "../../../models/Payment";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        const extractData = await Payment.find();
        if (extractData) {
            return NextResponse.json({
                success: true,
                data: extractData
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "Something goes wrong! Please try again."
            })
        }
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again.'
        })
    }
}