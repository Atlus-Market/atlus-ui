import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { PackageAccessValue } from '@/models/package-access-value';

export interface SharePackageRecipient {
  email: string;
  access: PackageAccessValue;
}

export interface SharePackageRequestPayload {
  recipients: SharePackageRecipient[];
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
