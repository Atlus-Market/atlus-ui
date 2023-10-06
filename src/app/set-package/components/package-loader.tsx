import 'server-only';
import { getPackageOnServer } from '@/api/package/get-package-on-server';
import { Package } from '@/models/package';
import { ReactNode } from 'react';
import { LoadPackageInStore } from '@/app/set-package/components/load-package-in-store';

interface PackageLoaderProps {
  packageId: string;
  atlusPackage?: Package | undefined;
  children: ReactNode;
}

export const PackageLoader = async ({ children, packageId }: PackageLoaderProps) => {
  let atlusPackage: Package | undefined;
  if (packageId && packageId !== 'new') {
    const getPackageResponse = await getPackageOnServer(packageId);
    atlusPackage = getPackageResponse.package;
    console.log(`[${Date.now()}] setPackage: `, atlusPackage);
    console.log(`[${Date.now()}] setPackage - Done!`);
  }

  return (
    <LoadPackageInStore atlusPackage={atlusPackage} isNewPackage={packageId === 'new'}>
      {children}
    </LoadPackageInStore>
  );
};
