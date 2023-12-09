import dbConnect from "@/dbConnect/dbConnect";
import User from "@/modals/User";
import { NextResponse, NextRequest } from "next/server"
import sendEmail from "@/lib/sendEmail";

export async function POST(req: NextRequest) {

    try {
        await dbConnect();

        const reqBody = await req.json();
        const { email } = reqBody

        // Validation
        if (!email) {
            return NextResponse.json({ error: "Something is missing" }, { status: 500 });
        }

        // check if the user is existing
        const isUserExist = await User.findOne({ email })
        // Validation
        if (!isUserExist) {
            console.log("User is not available");
            return NextResponse.json({ error: "User Not Found" }, { status: 500 });
        }

        // SEND EMAIL TO USER
        sendEmail({ emailAddress: email, emailType: "forgotPassword", userId: isUserExist?._id })

        return NextResponse.json({ success: true, message: "Validation email send Successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}