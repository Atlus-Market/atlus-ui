import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

export const selectSetPackageState = createSelector(
  (state: RootState) => state.setPackageReducer,
  state => state
);

export const selectPatents = createSelector(
  selectSetPackageState,
  state => state.familyPatents
);
