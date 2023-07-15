import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

export const selectSetPackageState = createSelector(
  (state: RootState) => state.setPackageReducer,
  stateP => stateP
);
export const selectAddPatentsActiveTab = createSelector(
  selectSetPackageState,
  (state) => state.addPatents.activeTab
);
