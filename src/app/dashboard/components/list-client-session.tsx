'use client';

import { signOut } from 'next-auth/react';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { LoginRoute } from '@/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/api/auth/logout';
import { useState } from 'react';

export const ListClientSession = () => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const mutation = useMutation({
    mutationFn: logout
  });
  return (
    <div>
      <AtlusButton
        isLoading={isLoggingOut}
        onClick={async () => {
          try {
            // Call logout from client because the call requires auth.
            setIsLoggingOut(true);
            await mutation.mutateAsync();
          } catch (e) {
          } finally {
            signOut({
              callbackUrl: LoginRoute,
              redirect: true
            });
          }
        }}>
        Logout
      </AtlusButton>
    </div>
  );
};
