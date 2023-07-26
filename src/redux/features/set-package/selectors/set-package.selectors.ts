import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

export const selectSetPackageState = (state: RootState) => state.setPackageReducer;

export const selectPatents = createSelector(
  selectSetPackageState,
  state => state.familyPatents
);
