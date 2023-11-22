import 'server-only';
import { getAtlusServerSession } from '@/app/(auth)/session/get-atlus-server-session';

export const isCurrentUserBroker = async (): Promise<boolean> => {
  const session = await getAtlusServerSession();

  if (!session) {
    throw new Error('Unable to get user type: No valid session.');
  }

  return session.user.isBroker;
};
