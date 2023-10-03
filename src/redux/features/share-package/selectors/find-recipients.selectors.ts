import { createSelector } from 'reselect';
import { selectSharePackageState } from '@/redux/features/share-package/selectors/share-package.selectors';

export const selectFindRecipientsActiveTab = createSelector(
  selectSharePackageState,
  state => state.findRecipientsPage.activeTab
);
