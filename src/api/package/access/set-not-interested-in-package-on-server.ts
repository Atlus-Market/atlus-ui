import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';

interface SetNotInterestedInPackageResponse {
  msg: string;
}

export const setNotInterestedInPackageOnServer = async (
  packageId: string
): Promise<SetNotInterestedInPackageResponse> => {
  return createRequest<void, SetNotInterestedInPackageResponse>({
    url: `/package/${packageId}/not-interested`,
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  }).then(getResponseData);
};
