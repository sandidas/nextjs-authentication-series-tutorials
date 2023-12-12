import bcryptjs from 'bcryptjs';
import clientPromise from "@/lib/mongoDBAdapter";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions, User as IUser } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/dbConnect/dbConnect";
import User from "@/modals/User";


interface ICustomDataOfUser extends IUser {
    roles: number[]; // Guest: 2001, Super Admin: 1010, Admin: 1100 Author: 2010
    active: boolean;
    is_admin: boolean;
    provider: string;
}

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
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name || "Unknown",
                    email: profile.email || "Unknown",
                    image: profile.avatar_url || "Unknown",
                    uid: profile.id,
                    roles: [2001],
                    active: true,
                    is_admin: false,
                    provider: "github"
                }
            }

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name || "Unknown",
                    email: profile.email,
                    image: profile.image,
                    uid: profile.sub,
                    roles: [2001],
                    active: true,
                    is_admin: false,
                    provider: "google"
                }
            }

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

    callbacks: {
        async jwt({ token, user, account }) {
            if (account) {
                token.accessToken = account?.access_token
            }
            let customData;
            if (user) {

           
                token.id = user?.id
                const userNewData = user as ICustomDataOfUser;

                if (!userNewData?.provider) {
                    const existUser = await User.findOne({
                        email: user?.email
                    })
                    customData = {
                        id: existUser?.id,
                        name: existUser?.name,
                        email: existUser?.email,
                        image: existUser?.image,
                        roles: existUser?.roles,
                        active: existUser?.active,
                        is_admin: existUser?.is_admin,
                    }

                }
                else {
                    customData = {
                        id: userNewData?.id,
                        name: userNewData?.name,
                        email: userNewData?.email,
                        image: userNewData?.image,
                        roles: userNewData?.roles,
                        active: userNewData?.active,
                        is_admin: userNewData?.is_admin,
                    }
                }

            }
            return ({ ...token, ...customData })
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        }
    }

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

//AS@#$df234234
// hello@example.com