import { PackageAccess } from '@/models/package-access';

export interface SharedWithState {
  isFetchingPackageAccess: boolean;
  activeRequestId: string | undefined;
  packageAccess: PackageAccess[];
}

export const sharedWithInitialState: SharedWithState = {
  isFetchingPackageAccess: false,
  activeRequestId: undefined,
  packageAccess: [],
};

export const sharedWithReducer = {};
