import { createRequest, ProtectedEndpoint } from '@/api/api';

interface SharePackageRequestPayload {
  recipients: string[];
  message: string;
}

export const sharePackage = (
  packageId: string,
  sharePackageRequestPayload: SharePackageRequestPayload
) => {
  return createRequest<SharePackageRequestPayload, void>({
    url: `/package/${packageId}/share`,
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: sharePackageRequestPayload,
  });
};
