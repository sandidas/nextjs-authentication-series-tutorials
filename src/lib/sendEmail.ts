import User from '@/modals/User';
import bcryptjs from 'bcryptjs';
import nodemailer, { TransportOptions } from "nodemailer"

interface IProps {
    emailAddress: string;
    emailType: "forgotPassword" | "emailValidation";
    userId: string;
}

const sendEmail = async ({ emailAddress, emailType, userId }: IProps) => {

    try {

        const convertedId = userId.toString();
        const hashedToken = await bcryptjs.hash(convertedId, 10)
        const tokenExpiry = new Date();
        tokenExpiry.setHours(tokenExpiry.getHours() + 5)

        const updateUserInformation = emailType === "emailValidation" ? {
            verifyToken: hashedToken,
            verifyTokenExpiry: tokenExpiry,
        } : {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: tokenExpiry,
        }

        await User.updateOne({ _id: userId }, { $set: updateUserInformation })

        // SEND EMAIL
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST as string,
            port: process.env.EMAIL_SERVER_PORT,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        } as TransportOptions);

        const tokenLink = `${process.env.NEXTAUTH_URL}/api/users/verify?type=${emailType}&token=${hashedToken}`
        // app url / api ? tokentype?=emailValidation&token=ourtoken


        const mailOptions = {
            from: process.env.EMAIL_SERVER_FROM, // sender address
            to: emailAddress, // list of receivers
            subject: "Validation email", // Subject line
            html: `Verify this link ${tokenLink}`, // html body
        }

        const emailSendInfo = await transporter.sendMail(mailOptions)
        console.log("emailSendInfo", emailSendInfo);

        // http://localhost:3000/api/users/verify?type=emailValidation&token=$2a$10$.vRZqie1El3JdB1.uLnVG.KC1rgY3bWc.v7Or1HVY9xNqFZBBy0/C

        return emailSendInfo;

    } catch (error: any) {
        throw new Error(error?.message);
    }



}

export default sendEmail;