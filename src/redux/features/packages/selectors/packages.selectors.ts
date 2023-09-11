import { RootState } from '@/redux/store';
import { createSelector } from 'reselect';
import { PackagesState } from '@/redux/features/packages/packages';

export const selectPackagesState = (state: RootState): PackagesState => state.packagesReducer;

export const selectPackagesList = createSelector(selectPackagesState, state => state.packagesList);

export const selectIsFetchingPackage = (packageId: string) =>
  createSelector(selectPackagesState, state => state.fetchingPackage[packageId]);
