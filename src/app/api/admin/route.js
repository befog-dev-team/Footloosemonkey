import connectToDB from "../../db/connectToDB";
import AdminLogin from "../../models/AdminLogin";
import { compare, hash } from 'bcryptjs'
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function POST(req) {
    try {
        await connectToDB();
        const { username, password } = await req.json();

        const checkUser = await AdminLogin.findOne({ username })

        if (!checkUser) {
            return NextResponse.json({
                success: false,
                message: "Invalid Username! Please try again."
            })
        }

        const hashPassword = await hash(checkUser.password, 12)
        const checkPassword = await compare(password, hashPassword)

        if (!checkPassword) {
            return NextResponse.json({
                success: false,
                message: "Invalid Password! Please try again."
            })
        }
        return NextResponse.json({
            success: true,
            message: "Login Successfull."
        });
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: "Something goes wrong! Please try again."
        })
    }
}