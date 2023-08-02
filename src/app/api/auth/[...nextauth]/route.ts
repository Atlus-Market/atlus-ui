import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CallbacksOptions, DefaultSession, EventCallbacks } from 'next-auth/src/core/types';
import { login, SignInResponse } from '@/api/auth/login';
import { JWT } from 'next-auth/jwt';
import { JWTCallback, SessionCallback } from '@/auth';
import { isAxiosError } from 'axios';
import { LoginRoute } from '@/constants/routes';


const providers = [
  CredentialsProvider({
    id: 'credentials',
    name: 'Credentials',
    type: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'text' },
      password: { label: 'Password', type: 'password' }
    },
    authorize: async (credentials, req): Promise<User> => {
      try {
        if (!credentials) {
          throw new Error('No credentials for login');
        }
        const loginResponse = await login({
          email: credentials.email,
          password: credentials.password
        });

        return {
          id: credentials.email,
          email: credentials.email,
          accessToken: loginResponse.accessToken,
          accessTokenCookie: loginResponse.accessTokenCookie,
          csrfToken: loginResponse.csrfAccessToken
        };
      } catch (e) {
        console.log('--------------------------- Auth Provider:authorize ERROR ---------------------------');
        if (isAxiosError(e) && e.response) {
          console.log('error data: ', e.response.data);
          console.log('error code: ', e.code);
          console.log('error status: ', e.response.status);
          const signResponse: SignInResponse = {
            status: e.response.status,
            data: e.response.data
          };
          throw new Error(JSON.stringify(signResponse));
        }
        console.log(e);
        throw new Error('Sign in Error');
      }
    }
  })
];

const callbacks: Partial<CallbacksOptions> = {
  async jwt({ token, user }: JWTCallback): Promise<JWT> {
    console.log('JWT callback...');
    if (user) {
      token.user = user;
    }

    return token;
  },

  // called from client
  async session({ session, token, user }: SessionCallback): Promise<Session | DefaultSession> {
    console.log('session callback...');
    session.user = token.user;
    return session;
  }
};

const events: Partial<EventCallbacks> = {
  signOut: async (params: { session: Session; token: JWT }) => {
    console.log('Signing OUT..............');
  }
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers,
  callbacks,
  events,
  pages: {
    signIn: LoginRoute,
    signOut: LoginRoute,
    error: `${LoginRoute}?error=true`// Changing the error redirect page to our custom login page
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
