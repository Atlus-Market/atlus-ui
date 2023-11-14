import { RootState } from '@/redux/store';
import { SharePackageState } from '@/redux/features/share-package/share-package';
import { createSelector } from 'reselect';

export const selectSharePackageState = (state: RootState): SharePackageState =>
  state.sharePackageReducer;

export const selectActivePage = createSelector(
  selectSharePackageState,
  state => state.shareBroker.activePage
);

export const selectIsShareModalOpen = createSelector(
  selectSharePackageState,
  state => state.isShareModalOpen
);

export const selectSharePackageId = createSelector(
  selectSharePackageState,
  state => state.packageId
);

export const selectIsPrivatePackage = createSelector(
  selectSharePackageState,
  state => state.isPrivatePackage
);
