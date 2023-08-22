import { RootState } from '@/redux/store';
import { createSelector } from 'reselect';

export const selectPackagesState = (state: RootState) => state.packagesReducer;

export const selectPackagesList = createSelector(
  selectPackagesState,
  state => state.packagesList
);
