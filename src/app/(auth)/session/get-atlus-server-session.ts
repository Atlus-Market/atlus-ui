import 'server-only';
import { authOptions } from '@/app/(auth)/auht-options';
import { getServerSession, User } from 'next-auth';

export interface ServerSession {
  user: User;
}

export const getAtlusServerSession = (): Promise<ServerSession | null> =>
  getServerSession(authOptions);
