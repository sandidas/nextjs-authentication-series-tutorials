import dbConnect from "@/dbConnect/dbConnect";
import User from "@/modals/User";
import { NextResponse, NextRequest } from "next/server"
import bcryptjs from "bcryptjs";
import sendEmail from "@/lib/sendEmail";


export async function POST(req: NextRequest) {

    try {
        await dbConnect();

        const reqBody = await req.json();
        const { name, password, email } = reqBody
        // Validation
        if (!name || !password || !email) {
            return NextResponse.json({ error: "Something is missing" }, { status: 500 });
        }

        // check if the user is existing
        const isUserExist = await User.findOne({ email })
        console.log("isUserExist", isUserExist);
        // Validation
        if (isUserExist) {
            return NextResponse.json({ error: "Existing user! try login" }, { status: 500 });
        }

        // generate salt
        const salt = await bcryptjs.genSalt(10)
        // convert password to hashed password
        const hashedPassword = await bcryptjs.hash(password, salt)
        // store to the database

        const newUser = await new User({ name, email, password: hashedPassword, active: false }).save();
        console.log(newUser);


        // SEND EMAIL TO USER
        sendEmail({ emailAddress: email, emailType: "emailValidation", userId: newUser?._id })



        return NextResponse.json({ success: true, message: "User Created Successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}