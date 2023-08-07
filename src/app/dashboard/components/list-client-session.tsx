'use client';

import { signOut } from 'next-auth/react';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { LoginRoute } from '@/constants/routes';
import { useState } from 'react';

export const ListClientSession = () => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  return (
    <div>
      <AtlusButton
        isLoading={isLoggingOut}
        onClick={async () => {
          setIsLoggingOut(true);
          signOut({
            callbackUrl: LoginRoute,
            redirect: true
          });
        }}>
        Logout
      </AtlusButton>
    </div>
  );
};
