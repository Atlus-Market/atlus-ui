import 'next-auth';

import { Session, User as NextAuthUser } from 'next-auth';
import { DefaultUser } from 'next-auth/src/core/types';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/src/adapters';

declare module 'next-auth' {
  type User = DefaultUser & {
    accessToken: string;
    // refreshToken: string;
    csrfToken: string;
  };

  interface Session {
    user?: User;
    hasAtlusInvalidSession?: boolean;
  }

  export type SessionCallback = Parameters<CallbacksOptions['session']>[0] & {
    session: Session;
    token: JWT;
    user: AdapterUser;
  };

  export type JWTCallback = Parameters<CallbacksOptions['jwt']>[0] & {
    token: JWT;
    user: User;
  };

  export type CallbacksOptions = {
    jwt: JWTCallback;
    session: SessionCallback;
  };
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: NextAuthUser;
  }
}
