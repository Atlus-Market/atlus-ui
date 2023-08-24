import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import { fetchPackage } from '@/redux/features/packages/thunks/get-package.thunks';
import { PackagesState } from '@/redux/features/packages/packages';

export const getPackageExtraReducers = (builder: ActionReducerMapBuilder<PackagesState>) => {
  builder.addCase(fetchPackage.pending, (state: PackagesState, action) => {
    const { meta } = action;
    const payload = meta.arg;
    console.log('getPackage.pending:action ', action);
    state.fetchingPackage[payload] = true;
  });

  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(fetchPackage.fulfilled, (state: PackagesState, action) => {
    console.log('getPackage.fulfilled:action ', action);
    const { meta } = action;
    const payload = meta.arg;
    state.fetchingPackage[payload] = false;
  });
  builder.addCase(fetchPackage.rejected, (state: PackagesState, action) => {
    console.log('getPackage.rejected:action ', action);
    const { meta } = action;
    const payload = meta.arg;
    state.fetchingPackage[payload] = false;
  });
};
