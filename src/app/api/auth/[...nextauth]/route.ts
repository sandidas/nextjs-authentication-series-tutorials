import bcryptjs from 'bcryptjs';
// app > api > auth > [...nextauth]/route.ts
import clientPromise from "@/lib/mongoDBAdapter";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/dbConnect/dbConnect";
import User from "@/modals/User";



export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: "/login"
    },

    session: {
        strategy: 'jwt',
        maxAge: 10 * 24 * 60 * 60,
        updateAge: 2 * 24 * 60 * 60
    },
    //  debug: process.env.NODE_ENV === "development",

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                }
            },
            from: process.env.EMAIL_SERVER_FROM,
        }),
        CredentialsProvider({

            name: "Credentials",

            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const formEmail = credentials?.email as string
                const formPassword = credentials?.password as string


                await dbConnect();
                const isUserExist = await User.findOne({
                    email: formEmail
                })

                if (!isUserExist) {
                    return null;
                }

                const isValidPassword = await bcryptjs.compare(formPassword, isUserExist?.password)

                if (!isValidPassword) {
                    return null;
                }

                return {
                    id: isUserExist?._id,
                    name: isUserExist?.name || "anonymous",
                    email: isUserExist?.email
                };

            }
        })

    ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
// qqO98g4&6
//  

