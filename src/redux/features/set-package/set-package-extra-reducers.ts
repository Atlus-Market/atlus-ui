import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import { SetPackageState } from '@/redux/features/set-package/set-package';
import { persistPackage } from '@/redux/features/set-package/thunks/set-package.thunk';

export const createSetPackageExtraReducers = (
  builder: ActionReducerMapBuilder<SetPackageState>
) => {
  builder.addCase(persistPackage.pending, (state: SetPackageState, action) => {
    const { meta } = action;
    const payload = meta.arg;
    console.log('persistPackage.pending:action ', action);
    state.isPersistingPackage = true;
  });

  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(persistPackage.fulfilled, (state: SetPackageState, action) => {
    console.log('persistPackage.fulfilled:action ', action);
    state.isPersistingPackage = false;
  });
  builder.addCase(persistPackage.rejected, (state: SetPackageState, action) => {
    console.log('persistPackage.rejected:action ', action);
    state.isPersistingPackage = false;
  });
};
