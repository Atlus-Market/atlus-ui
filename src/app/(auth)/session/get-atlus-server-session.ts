import 'server-only';
import { authOptions } from '@/app/(auth)/auht-options';
import { getServerSession } from 'next-auth';

export const getAtlusServerSession = () => getServerSession(authOptions);
