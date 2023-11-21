import 'server-only';
import { authOptions } from '@/app/(auth)/auht-options';
import { getServerSession, NextAuthOptions, User } from 'next-auth';
import { hasTokenExpired } from '@/utils/auth';

export interface ServerSession {
  user: User;
}

export const getAtlusServerSession = async (): Promise<ServerSession | null> => {
  const session = await getServerSession<NextAuthOptions, ServerSession>(authOptions);
  if (session) {
    const token = session.user?.accessToken;
    if (token && !hasTokenExpired(token)) {
      return session;
    }
  }
  return null;
};
