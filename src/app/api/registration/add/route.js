import Registration from "../../../models/Registration";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const extractData = await req.json();

        // Destructure required fields from the incoming data
        const { email, name, ageCriteria, age, guardianNumber, address, talent, charge, termsAccepted } = extractData;

        // Create a new Registration document
        const registration = new Registration({ email, name, ageCriteria, age, guardianNumber, address, talent, charge, termsAccepted });

        // Save the document to the database
        const result = await registration.save();

        // Check if the data was saved successfully
        if (result) {
            return NextResponse.json({
                success: true,
                message: "Data Saved Successfully.",
                data: result
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again."
            });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
}