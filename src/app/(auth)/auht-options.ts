import { NextAuthOptions, Session, User } from 'next-auth';
import { LoginRoute } from '@/constants/routes';
import { CallbacksOptions, DefaultSession, EventCallbacks } from 'next-auth/src/core/types';
import { JWTCallback, SessionCallback } from '@/auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login, SignInResponse } from '@/api/auth/login';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { accessTokenCookieName } from '@/constants/api';
import { logout } from '@/api/auth/logout';


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

        cookies().set(accessTokenCookieName, loginResponse.accessTokenCookie, {
          httpOnly: true,
          secure: true
        });

        return {
          id: credentials.email,
          email: credentials.email,
          accessToken: loginResponse.accessToken,
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
    if (user) {
      token.user = user;
    }
    return token;
  },

  // called from client
  async session({ session, token, user }: SessionCallback): Promise<Session | DefaultSession> {
    session.user = token.user;
    return session;
  }
};

const events: Partial<EventCallbacks> = {
  signOut: async (params: { session: Session; token: JWT }) => {
    try {
      await logout();
      console.log('Signed OUT SUCCESSFULLY!!!!');
    } catch (e) {
      console.log('SIGN OUT ERROR: ', e);
    } finally {
      cookies().delete(accessTokenCookieName);
    }
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
  },
  secret: process.env.NEXTAUTH_SECRET
};
