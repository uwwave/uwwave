import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { auth } from "src/lib/server/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import connectToDb from "src/database/mongo-db";
import mongoose from "mongoose";
import UserDataDocument from "src/database/models/UserData";
import {
  generateRandomUsername,
  generateRandomUsernameFromName,
} from "src/lib/server/accounts/helpers";

export const nextAuthOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async credentials => {
        try {
          if (!credentials) {
            return Promise.reject();
          }
          const { email, password } = credentials;
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            emailVerified: userCredential.user.emailVerified,
          };
          return Promise.resolve(user);
        } catch (error) {
          // Return null if authentication fails
          return Promise.resolve(null);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: MongoDBAdapter(
    connectToDb().then(() => mongoose.connection.getClient())
  ) as any,
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn(params) {
      const { account, user } = params;
      const isGoogleSignIn = account?.provider === "google";
      const email = user.email;
      if (isGoogleSignIn && email) {
        //create a new userData for the google sign in
        let userDoc = await UserDataDocument.findOne({
          uid: account.providerAccountId,
        });
        if (!userDoc) {
          let username = generateRandomUsernameFromName(
            user.name ?? "FruitLoops"
          );
          for (let i = 0; i < 11; i++) {
            const doc = await UserDataDocument.findOne({ username });
            if (!doc) {
              break;
            }
            username = generateRandomUsernameFromName(
              user.name ?? "FruitLoops"
            );
            if (i === 10) {
              // eslint-disable-next-line no-constant-condition
              while (true) {
                username = generateRandomUsername();
                const doc = await UserDataDocument.findOne({ username });
                if (!doc) {
                  break;
                }
              }
            }
          }
          userDoc = await UserDataDocument.create({ username, uid: user.id });
        }
      }
      return true;
    },
    async jwt(params) {
      const { token, user, account } = params;
      const anyUser = user as any;
      if (anyUser) {
        // Check if the user signed in with Google
        const isGoogleSignIn = account?.provider === "google";
        // Check if the user's email is verified
        const emailVerified = isGoogleSignIn || anyUser.emailVerified;
        const userData = isGoogleSignIn
          ? await UserDataDocument.findOne({ uid: account.providerAccountId })
          : await UserDataDocument.findOne({ uid: user.id });
        token.user = {
          emailVerified,
          id: userData?.id,
          username: userData?.username,
        };
      }
      return token;
    },
    async session(params) {
      const { session, token } = params;
      const anySession = session as any;
      anySession.user = token.user;
      return anySession;
    },
  },
};

export default NextAuth(nextAuthOptions);
