import { createSelector } from 'reselect';
import { selectSharePackageState } from '@/redux/features/share-package/selectors/share-package.selectors';

export const selectSharedWithState = createSelector(
  selectSharePackageState,
  state => state.sharedWithPage
);

export const selectPackageAccess = createSelector(
  selectSharedWithState,
  state => state.packageAccess
);
