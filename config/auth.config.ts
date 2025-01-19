import { supabase } from '@/lib/supabaseClient';
import type { NextAuthOptions, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
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
      async authorize(
        credentials: Record<string, string> | undefined,
      ): Promise<User | null> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(4) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        // Validate the user's credentials with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.user) {
          return null;
        }

        const user: User = {
          id: data.user.id,
          name: data.user.user_metadata.full_name || 'User',
          email: data.user.email!,
          emailVerified: data.user.email_confirmed_at
            ? new Date(data.user.email_confirmed_at)
            : null,
        };

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('jwt async funct:', { token, user });
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      console.log({ token });
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log('session async funct:', { session, token });
      if (token) {
        session.user = {
          email: token.email as string,
          name: token.name as string,
          image: session.user?.image || null,
        };
      }
      console.log({ session });
      return session;
    },
  },
};
