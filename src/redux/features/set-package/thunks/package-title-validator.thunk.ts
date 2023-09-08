import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { selectPackage } from '@/redux/features/set-package/selectors/set-package.selectors';
import { getPackages } from '@/api/package/get-packages';

interface PackageTitleValidatorPayload {
  userId: string;
  title: string;
}

export const packageTitleValidator = createAsyncThunk<
  void,
  PackageTitleValidatorPayload,
  { state: RootState }>(
  'setPackage/package/validateTitle',
  async ({ title: titleToValidate, userId }, thunkAPI) => {
    try {
      const { getState, signal } = thunkAPI;
      const activePackage = selectPackage(getState());

      if (!titleToValidate) {
        throw new Error('No title to validate');
      }

      if (activePackage && activePackage.title === titleToValidate) {
        return;
      }

      const { packages: packagesListItems } = await getPackages(userId, signal);
      const foundPackage = packagesListItems.find(packageListItem => titleToValidate === packageListItem.title);

      if (foundPackage) {
        throw new Error(`Title ${titleToValidate} not available.`);
      }

    } catch (e: any) {
      console.error(e.message);
      throw e;
    }
  }
);

