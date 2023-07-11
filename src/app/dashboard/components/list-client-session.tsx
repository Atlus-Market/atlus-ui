'use client';

import { signOut, useSession } from 'next-auth/react';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { LoginRoute } from '@/constants/routes';

export const ListClientSession = () => {
  const session = useSession();
  console.log(session);
  return (
    <div>
      Client Session

      <AtlusButton onClick={() => signOut({
        callbackUrl: LoginRoute,
        redirect: true,
      })}>Logout</AtlusButton>
    </div>
  );
};
