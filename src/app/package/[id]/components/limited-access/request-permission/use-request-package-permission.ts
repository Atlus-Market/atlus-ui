import { useMutation } from '@tanstack/react-query';
import { requestPackageAccess } from '@/api/package/request-package-access';

interface UseRequestPackagePermissionProps {
  packageId: string;
}

export const useRequestPackagePermission = ({ packageId }: UseRequestPackagePermissionProps) => {
  return useMutation({
    mutationFn: () => requestPackageAccess(packageId),
  });
};
