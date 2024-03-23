import bcrypt from "bcrypt";
import dbConnect from '@/utils/dbConnect';
import {User} from '@/models/User';
import NextAuth, {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// const bcrypt = require("bcrypt");

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
    callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.type) token.type = user.type;

      return token;
    },
    async session ({ session, token, user }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        if (
          c !== "iat" &&
          c !== "exp" &&
          c !== "jti" &&
          c !== "apiToken"
        ) {
          return { ...p, [c]: token[c] }
        } else {
          return p
        }
      }, {})
      return { ...session, user: sanitizedToken, apiToken: token.apiToken }
    },
    
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        await dbConnect()
        const user = await User.findOne({email});
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        if (passwordOk) {
          return user;
        }

        return null
      }
    })
  ],
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }