import dbConnect from "@/dbConnect/dbConnect";
import User from "@/modals/User";
import { NextResponse, NextRequest } from "next/server"



export async function GET(req: NextRequest) {

    try {
        await dbConnect();
        const searchParams = req.nextUrl.searchParams
        const tokenType = searchParams?.get('type');
        const token = searchParams?.get('token');

        // console.log("tokenType", tokenType);
        // console.log("token", token);

        let user;

        // NEW USER EMAIL VALIDATION
        if (tokenType === "emailValidation") {
            user = await User.findOne({
                verifyToken: token,
                verifyTokenExpiry: { $gt: Date.now() },
            })

            if (!user) {
                return NextResponse.json({ error: "User Not found" }, { status: 500 });
            }

            user.active = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;
            await user.save();
        } // FORGOT PASSWORD EMAIL validation
        else if (tokenType === "forgotPassword") {

            user = await User.findOne({
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: { $gt: Date.now() },
            })
            if (!user) {
                return NextResponse.json({ error: "User Not found" }, { status: 500 });
            }

            //  user.forgotPasswordToken = undefined;
            //  user.forgotPasswordTokenExpiry = undefined;
            //   await user.save();

            const resetPasswordUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}&verified=true`
            return NextResponse.redirect(resetPasswordUrl)


        }





        return NextResponse.json({ success: true, message: "Email is verified" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}