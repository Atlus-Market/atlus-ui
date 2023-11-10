import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { Package } from '@/models/package';
import { PackageAccessValue } from '@/models/package-access-value';

export interface ChangePackageAccessPayload {
  access: PackageAccessValue;
}

export interface ChangePackageAccessResponse {
  package: Package;
}

export const changePackageAccess = (
  packageId: string,
  email: string,
  payload: ChangePackageAccessPayload
) => {
  return createRequest<ChangePackageAccessPayload, ChangePackageAccessResponse>({
    url: `/package/${packageId}/change-access/${email}`,
    method: 'PATCH',
    isProtected: ProtectedEndpoint.True,
    data: payload,
  }).then(getResponseData);
};
