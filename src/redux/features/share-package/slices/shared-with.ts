import { PackageAccess } from '@/models/package-access';

export interface SharedWithState {
  isFetchingPackageAccess: boolean;
  activeRequestId: string | undefined;
  packageAccess: PackageAccess[];

  // Change Package Access
  changePackageRequestId: string | undefined;
  isChangingPackageAccess: boolean;
}

export const sharedWithInitialState: SharedWithState = {
  isFetchingPackageAccess: false,
  activeRequestId: undefined,
  packageAccess: [],

  // Change Package Access
  changePackageRequestId: undefined,
  isChangingPackageAccess: false,
};

export const sharedWithReducer = {};
