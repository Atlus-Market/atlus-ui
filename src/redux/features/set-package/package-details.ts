import {
  IPackageDetailsForm
} from '@/app/set-package/(pages)/package-details/package-details-form';
import { SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';

export interface PackageDetailsState {
  packageDetailsForm: IPackageDetailsForm | undefined;
}

export const packageDetailsInitialState: PackageDetailsState = {
  packageDetailsForm: undefined
};

export const packageDetailsReducer = {
  setPackageDetails: (state: SetPackageState, action: PayloadAction<IPackageDetailsForm>) => {
    state.packageDetails.packageDetailsForm = action.payload;
  }
};
