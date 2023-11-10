import 'server-only';
import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';

interface SetPackageAccessRequestPayload {
  approved: boolean;
}

interface SetPackageAccessResponse {
  msg: string;
}

export const setPackageAccessRequestOnServer = async (
  requestId: string,
  data: SetPackageAccessRequestPayload
) => {
  return createRequest<SetPackageAccessRequestPayload, SetPackageAccessResponse>({
    url: `/package-access-request/${requestId}`,
    method: 'PUT',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
    data,
  }).then(getResponseData);
};
