'use client';

import { useCallback, useTransition } from 'react';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@/components/ui/notification/atlus-notification';
import { defaultErrorMessage } from '@/constants/api';
import { notInterestedInPackageAction } from '@/app/actions/not-interested-in-package.action';

interface UseNotInterestedInPackageProps {
  packageId: string;
}

export const useNotInterestedInPackage = ({ packageId }: UseNotInterestedInPackageProps) => {
  const [isLoading, startTransition] = useTransition();

  const setNotInterestedInPackage = useCallback(() => {
    startTransition(async () => {
      const result = await notInterestedInPackageAction(packageId);
      if (!result.error) {
        showSuccessNotification({
          text: 'Package preference updated successfully',
          toastId: packageId,
        });
      } else {
        showErrorNotification({
          text: result.errorMessage || defaultErrorMessage,
          toastId: packageId,
        });
      }
    });
  }, [packageId]);

  return {
    setNotInterestedInPackage,
    isLoading,
  };
};
