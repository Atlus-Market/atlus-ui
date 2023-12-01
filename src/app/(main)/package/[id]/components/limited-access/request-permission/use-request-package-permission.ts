import { useMutation } from '@tanstack/react-query';
import { requestPackageAccess } from '@/api/package/access/request-package-access';

interface UseRequestPackagePermissionProps {
  packageId: string;
}

export const useRequestPackagePermission = ({ packageId }: UseRequestPackagePermissionProps) => {
  return useMutation({
    mutationKey: [packageId],
    mutationFn: (message: string) => requestPackageAccess({ packageId, message }),
  });
};
