import { RootState } from '@/redux/store';
import { SharePackageState } from '@/redux/features/share-package/share-package';
import { createSelector } from 'reselect';

export const selectSharePackageState = (state: RootState): SharePackageState =>
  state.sharePackageReducer;

export const selectActiveTab = createSelector(selectSharePackageState, state => state.activeTab);
