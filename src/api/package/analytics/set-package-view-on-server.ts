import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';

export const setPackageViewOnServer = async (packageId: string): Promise<void> => {
  return createRequest<void, void>({
    url: `/package/${packageId}/view`,
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  }).then(getResponseData);
};
