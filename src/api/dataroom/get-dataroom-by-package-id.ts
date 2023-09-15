import 'server-only';
import { AtlusAuthRequestHeaders, createRequest, ProtectedEndpoint } from '@/api/api';
import { Dataroom } from '@/models/dataroom';

export const getDataroomByPackageId = async (
  packageId: string,
  authRequestHeaders?: AtlusAuthRequestHeaders
): Promise<Dataroom> => {
  return createRequest<void, Dataroom>({
    url: `/dataroom/package/${packageId}`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    ...authRequestHeaders,
  });
};
