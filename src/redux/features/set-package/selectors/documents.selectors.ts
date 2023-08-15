import { createSelector } from 'reselect';
import {
  selectSetPackageState
} from '@/redux/features/set-package/selectors/set-package.selectors';

export const selectDocumentsState = createSelector(
  selectSetPackageState,
  state => state.documents
);

export const selectActiveDataroom = createSelector(
  selectSetPackageState,
  state => state.package?.dataroomId
);

export const selectDataroom = createSelector(
  selectDocumentsState,
  state => state.dataroom
);
