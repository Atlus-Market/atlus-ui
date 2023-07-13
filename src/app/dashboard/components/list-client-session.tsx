'use client';

import { signOut } from 'next-auth/react';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { LoginRoute } from '@/constants/routes';

export const ListClientSession = () => {
  return (
    <div>
      <AtlusButton onClick={() => signOut({
        callbackUrl: LoginRoute,
        redirect: true
      })}>Logout</AtlusButton>
    </div>
  );
};
