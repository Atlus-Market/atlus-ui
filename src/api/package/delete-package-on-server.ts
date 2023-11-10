import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';

interface DeletePackageResponse {
  msg: string;
}

export const deletePackageOnServer = async (packageId: string): Promise<DeletePackageResponse> => {
  return createRequest<void, DeletePackageResponse>({
    url: `/package/${packageId}`,
    method: 'DELETE',
    isProtected: ProtectedEndpoint.True,
    headers: await getServerAuthHeaders(),
  }).then(getResponseData);
};
