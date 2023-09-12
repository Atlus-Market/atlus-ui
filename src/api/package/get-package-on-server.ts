import 'server-only';
import { getPackage } from '@/api/package/get-package';
import { getServerAuthHeaders } from '@/api/api-server';

export const getPackageOnServer = async (packageId: string) => {
  return getPackage(packageId, { headers: await getServerAuthHeaders() });
};
