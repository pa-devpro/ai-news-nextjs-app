import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
};

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, string> | undefined): Promise<User | null> {
        // This needs logic to validate the credentials
        // [ToDo]: Implement this logic
        const parsedCredentials = z
          .object({ email: z.string(), password: z.string().min(4) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          console.log('Credentials:', parsedCredentials.data);
          const { email } = parsedCredentials.data;
          // Check on database if the user exist
          // If user exist, return the user object
          // const user = await getUserByEmail(email);

          const user: User = { id: '1', name: 'User', email, emailVerified: new Date() }; // Example user object

          if (user) return user;
          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // token.role = user.role; // Add role to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // session.id = token.id;
        // session.user.role = token.role; // Add role to the session
      }
      return session;
    },
  },
};
