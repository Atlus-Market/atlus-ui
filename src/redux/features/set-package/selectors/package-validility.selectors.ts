import { createSelector } from 'reselect';
import {
  selectPackageDetailsFormValues
} from '@/redux/features/set-package/selectors/package-details.selectors';
import { selectPackagePatents } from '@/redux/features/set-package/selectors/set-package.selectors';

export const selectPackageHasValidPatents = createSelector(
  selectPackagePatents,
  selectPackageDetailsFormValues,
  (patents, packageDetails) => {
    return patents.length > 0;
  }
);
