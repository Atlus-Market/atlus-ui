'use client';

import { useEffect, useId } from 'react';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@/components/ui/notification/atlus-notification';
import { useRouter } from 'next/navigation';
import { DashboardRoute } from '@/constants/routes';
import { useAtlusSession } from '@/app/(auth)/session/use-atlus-session';
import { ConfirmEmailChangeResponse } from '@/api/auth/confirm-email-change-on-server';
import { UpdateSessionData, UpdateSessionDataType } from '@/app/(auth)/update-session-data';

interface ConfirmEmailChangeProps {
  confirmEmailChangeResponse: ConfirmEmailChangeResponse | null;
  errorMessage: string | null;
}

export const ConfirmEmailChange = ({
  confirmEmailChangeResponse,
  errorMessage,
}: ConfirmEmailChangeProps) => {
  const router = useRouter();
  const session = useAtlusSession();
  const { update } = session;
  const toastId = useId();
  const user = session?.data?.user;

  useEffect(() => {
    const updateSession = async () => {
      if (confirmEmailChangeResponse) {
        const sessionUpdate: UpdateSessionData = {
          type: UpdateSessionDataType,
          data: confirmEmailChangeResponse,
        };
        await update(sessionUpdate);
        showSuccessNotification({ text: 'Email changed successfully!', toastId });
        router.replace(DashboardRoute);
      } else if (errorMessage) {
        showErrorNotification({ text: errorMessage, toastId });
        router.replace(DashboardRoute);
      }
    };

    if (
      user?.accessToken !== confirmEmailChangeResponse?.accessToken &&
      user?.csrfToken !== confirmEmailChangeResponse?.csrfAccessToken
    ) {
      updateSession();
    }
  }, [
    confirmEmailChangeResponse,
    errorMessage,
    router,
    toastId,
    update,
    user?.accessToken,
    user?.csrfToken,
  ]);

  return null;
};
