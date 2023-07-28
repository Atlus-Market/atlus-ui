import { createSelector } from 'reselect';
import {
  selectSetPackageState
} from '@/redux/features/set-package/selectors/set-package.selectors';


const selectPackageDetailsState = createSelector(
  selectSetPackageState,
  state => state.packageDetails
);

export const selectPackageDetailsFormValues = createSelector(
  selectPackageDetailsState,
  state => state.packageDetailsForm
);
