import {
  CallbacksOptions,
  EventCallbacks,
  JWTCallback,
  NextAuthOptions,
  Session,
  SessionCallback,
  User,
} from 'next-auth';
import { LoginRoute } from '@/constants/routes';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login, SignInResponse } from '@/api/auth/login';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { accessTokenCookieName } from '@/constants/api';
import { logout } from '@/api/auth/logout';
import { isSecureProtocol } from '@/utils/platform';
import { jwtDecode } from 'jwt-decode';
import { getUnixTime } from 'date-fns';

const usingSecureDomain = isSecureProtocol(process.env.NEXTAUTH_URL as string);

const providers = [
  CredentialsProvider({
    id: 'credentials',
    name: 'Credentials',
    type: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (credentials, req): Promise<User> => {
      try {
        if (!credentials) {
          throw new Error('No credentials for login');
        }
        const loginResponse = await login({
          email: credentials.email,
          password: credentials.password,
        });

        cookies().set(accessTokenCookieName, loginResponse.accessTokenCookie, {
          httpOnly: true,
          secure: usingSecureDomain,
          domain: process.env.COOKIE_DOMAIN,
          path: '/',
        });

        return {
          id: loginResponse.userId,
          email: credentials.email,
          accessToken: loginResponse.accessToken,
          refreshToken: loginResponse.refreshToken,
          csrfToken: loginResponse.csrfAccessToken,
          fullName: loginResponse.fullName,
        };
      } catch (e) {
        console.log(
          '--------------------------- Auth Provider:authorize ERROR ---------------------------'
        );
        if (isAxiosError(e) && e.response) {
          console.log('error data: ', e.response.data);
          console.log('error code: ', e.code);
          console.log('error status: ', e.response.status);
          const signResponse: SignInResponse = {
            status: e.response.status,
            data: e.response.data,
          };
          throw new Error(JSON.stringify(signResponse));
        } else {
          console.log(e);
        }
        throw new Error('Sign in Error');
      }
    },
  }),
];

const callbacks: Partial<CallbacksOptions> = {
  // user is present only the first time after login
  async jwt({ token, user }: JWTCallback): Promise<JWT> {
    console.log('*** JWT [start] *** ');
    console.log('Token: ', token);
    console.log('User: ', user);

    if (token.user) {
      const decoded = jwtDecode(token.user.accessToken);
      const tokenExpiresAt = decoded?.exp ?? 0;
      console.log('access_token expires at: ', tokenExpiresAt);
      const now = getUnixTime(new Date());
      console.log('now: ', now);
      console.log(decoded);

      if (tokenExpiresAt < now) {
        console.log('BE TOKEN HAS EXPIRED!!!');
        return {
          ...token,
          hasAtlusInvalidSession: true,
        };
      }
    }

    console.log('*** JWT [end] *** ');
    if (user) {
      token.user = user;
    }
    return token;
  },

  // Called from client
  // Checks next-auth session is valid
  // Exposes data to the client
  async session({ session, token, user }: SessionCallback): Promise<Session> {
    console.log('*** Session [start]*** ');
    console.log('session: ', session);
    console.log('token: ', token);
    console.log('user: ', user);
    console.log('*** Session [end]*** ');

    if (token.hasAtlusInvalidSession) {
      session.hasAtlusInvalidSession = token.hasAtlusInvalidSession;
    } else {
      session.user = token.user;
    }

    return session;
  },
};

const events: Partial<EventCallbacks> = {
  // @ts-ignore
  // async signIn(...rest) {
  //   console.log('___SIGN REDIRECT: ', rest);
  //   return true;
  // },
  signOut: async (params: { session: Session; token: JWT }) => {
    try {
      await logout();
      console.log('Signed OUT SUCCESSFULLY!!!!');
    } catch (e) {
      console.log('SIGN OUT ERROR: ', e);
    } finally {
      cookies().delete(accessTokenCookieName);
    }
  },
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 3600, //60 * 60 * 24 * 30, // 30 days in seconds
  },
  providers,
  callbacks,
  events,
  pages: {
    signIn: LoginRoute,
    signOut: LoginRoute,
    error: `${LoginRoute}?error=true`, // Changing the error redirect page to our custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
