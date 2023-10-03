import { createSelector } from 'reselect';
import { selectSharePackageState } from '@/redux/features/share-package/selectors/share-package.selectors';

export const selectFindRecipientsPageState = createSelector(
  selectSharePackageState,
  state => state.findRecipientsPage
);

export const selectFindRecipientsActiveTab = createSelector(
  selectFindRecipientsPageState,
  state => state.activeTab
);