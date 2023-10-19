import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';

export interface SharePackageRequestPayload {
  recipients: { email: string; access: number }[];
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
  }).then(getResponseData);
};
