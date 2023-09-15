import 'server-only';
import { getServerAuthHeaders } from '@/api/api-server';
import { Dataroom } from '@/models/dataroom';
import { getDataroomByPackageId } from '@/api/dataroom/get-dataroom-by-package-id';

export const getDataroomByPackageIdOnServer = async (packageId: string): Promise<Dataroom> => {
  return getDataroomByPackageId(packageId, { headers: await getServerAuthHeaders() });
};
