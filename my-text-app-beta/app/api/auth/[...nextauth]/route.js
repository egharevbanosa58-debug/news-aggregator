// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from 'bcryptjs';
// import { users } from "@/app/lib/users";

// const handler = NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: {},
//                 password: {},
//             },

//             async authorize(credentials) {
//                 // Check for empty email
//                 if (!credentials.email) {
//                     throw new Error("Email is required");
//                 }

//                 // Check for empty password
//                 if (!credentials.password) {
//                     throw new Error("Password is required");
//                 }

//                 // Check if user exists
//                 const user = users.find((u) => u.email === credentials.email);
//                 if (!user) {
//                     throw new Error("No account found with this email");
//                 }

//                 // Verify password
//                 const passwordMatch = await bcrypt.compare(credentials.password, user.password);
//                 if (!passwordMatch) {
//                     throw new Error("Incorrect password");
//                 }

//                 // Return user data to be encoded in JWT
//                 return {
//                     id: user.email,
//                     email: user.email,
//                     name: user.name || user.email.split('@')[0],
//                 };
//             }
//         }),
//     ], 
//     session: { strategy: "jwt" },
//     callbacks: {
//         async jwt({ token, user }) {
//             // Encode user data into JWT
//             if (user) {
//                 token.id = user.id;
//                 token.email = user.email;
//                 token.name = user.name;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             // Decode user data from JWT and return in session
//             session.user.id = token.id;
//             session.user.email = token.email;
//             session.user.name = token.name;
//             return session;
//         },
//     },
// });

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { users } from "@/app/lib/users";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials.email) {
          throw new Error("Email is required");
        }
        if (!credentials.password) {
          throw new Error("Password is required");
        }
        const user = users.find((u) => u.email === credentials.email);
        if (!user) {
          throw new Error("No account found with this email");
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }
        return {
          id: user.email,
          email: user.email,
          name: user.name || user.email.split('@')[0],
        };
      }
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };