'use client';

import { useCallback, useTransition } from 'react';
import { deletePackageAction } from '@/app/actions/delete-package.action';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@/components/ui/notification/atlus-notification';
import { defaultErrorMessage } from '@/constants/api';

interface UseDeletePackageActionProps {
  packageId: string;
}

export const useDeletePackageAction = ({ packageId }: UseDeletePackageActionProps) => {
  const [isPending, startTransition] = useTransition();

  const deletePackage = useCallback(() => {
    startTransition(async () => {
      const result = await deletePackageAction(packageId);
      if (!result.error) {
        showSuccessNotification({ text: 'Package deleted successfully', toastId: packageId });
      } else {
        showErrorNotification({
          text: result.errorMessage || defaultErrorMessage,
          toastId: packageId,
        });
      }
    });
  }, [packageId]);

  return {
    deletePackage,
    isDeletingPackage: isPending,
  };
};
