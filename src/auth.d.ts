import 'next-auth';

import { DefaultSession, Session, User } from 'next-auth';
import { CallbacksOptions } from 'next-auth/src/core/types';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/src/adapters';


declare module 'next-auth' {

  type SessionUser = DefaultSession['user'] & {
    accessToken?: string;
    accessTokenCookie?: string;
  }

  interface User extends SessionUser {
    id: string;
  }

  interface Session {
    user?: SessionUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
  }
}

export type SessionCallback = Parameters<CallbacksOptions['session']>[0] & {
  session: Session,
  token: JWT,
  user: AdapterUser
}

export type JWTCallback = Parameters<CallbacksOptions['jwt']>[0] & {
  token: JWT,
  user: User,
}
