import { createSelector } from 'reselect';
import {
  selectPackageDetailsFormValues
} from '@/redux/features/set-package/selectors/package-details.selectors';
import {
  IPackageDetailsForm,
  packageDetailsSchema
} from '@/app/set-package/(pages)/package-details/package-details-form';
import { selectPackagePatents } from '@/redux/features/set-package/selectors/set-package.selectors';

export const selectIsPackageValid = createSelector(
  selectPackagePatents,
  selectPackageDetailsFormValues,
  (patents, packageDetails) => {
    const hasPatents = patents.length > 0;
    return hasPatents && isPackageDetailsFormValid(packageDetails);
  }
);

const isPackageDetailsFormValid = (packageDetailsValues: Partial<IPackageDetailsForm> | undefined): boolean => {
  try {
    packageDetailsSchema.validateSync(packageDetailsValues);
    return true;
  } catch (e) {
    return false;
  }
};
