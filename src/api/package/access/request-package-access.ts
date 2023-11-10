import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';

export interface RequestPackageAccessPayload {
  packageId: string;
  message: string;
}

export const requestPackageAccess = (payload: RequestPackageAccessPayload) => {
  return createRequest<RequestPackageAccessPayload, void>({
    url: '/package-access-request',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    data: payload,
  }).then(getResponseData);
};
