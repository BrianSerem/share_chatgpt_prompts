import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDb } from "@utils/database";
import User from '@models/user';


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    async session({ session }) {

        const UserSession = await User.findOne({
            email: session.user.email
        })
        session.user.id = UserSession._id.toString()

    },

    async signIn({ profile }) {
        try {
            await connectToDb()
            // Check if user exists, if not create them as a new user
            const userExists = await User.findOne({
                email: profile.email
            });

            if(!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(' ', '').toLowerCase(),
                    image: profile.picture
                })
            }
            return true;
        } catch (error) {

            console.log(error);
            return false;

        }
    }

})

export { handler as GET, handler as POST }; 