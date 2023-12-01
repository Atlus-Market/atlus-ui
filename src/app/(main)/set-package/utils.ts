import { Package } from '@/models/package';
import { getPackageOnServer } from '@/api/package/get-package-on-server';

export const getPackageOnPageLoad = async (packageId: string): Promise<Package | undefined> => {
  let atlusPackage: Package | undefined;
  if (packageId && packageId !== 'new') {
    const getPackageResponse = await getPackageOnServer(packageId);
    atlusPackage = getPackageResponse.package;
    console.log('setPackage: ', atlusPackage);
    return atlusPackage;
  }

  return undefined;
};
