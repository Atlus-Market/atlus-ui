'use client';

import { AtlusSplashLoader } from '@/components/ui/splash-loader/atlus-splash-loader';
import { useEffect } from 'react';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@/components/ui/notification/atlus-notification';
import { useRouter } from 'next/navigation';
import { LogoutRoute } from '@/constants/routes';

interface DeleteUserAccountHandlerProps {
  deleteUserAccountResult: boolean;
  errorMessage?: string;
}

export const DeleteUserAccountHandler = ({
  deleteUserAccountResult,
  errorMessage,
}: DeleteUserAccountHandlerProps) => {
  const router = useRouter();

  useEffect(() => {
    if (deleteUserAccountResult) {
      showSuccessNotification({ text: 'User deleted successfully!' });
    } else if (errorMessage) {
      showErrorNotification({ text: errorMessage });
    }
    router.push(LogoutRoute);
  }, [deleteUserAccountResult, errorMessage, router]);

  return <AtlusSplashLoader />;
};
