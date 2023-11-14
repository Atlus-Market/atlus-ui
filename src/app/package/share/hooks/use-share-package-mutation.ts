import { useMutation } from '@tanstack/react-query';
import { sharePackage, SharePackageRequestPayload } from '@/api/package/access/share-package';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';

export const useSharePackageMutation = (packageId: string) => {
  return useMutation({
    mutationFn: (sharePackagePayload: SharePackageRequestPayload) =>
      sharePackage(packageId, sharePackagePayload),
    onSuccess: () => {
      showSuccessNotification({
        text: 'Package shared correctly!',
      });
    },
  });
};
