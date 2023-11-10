import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { selectSharePackageId } from '@/redux/features/share-package/selectors/share-package.selectors';
import { getPackageAccess } from '@/api/package/access/get-package-access';
import { PackageAccess } from '@/models/package-access';

export const fetchPackageAccess = createAsyncThunk<PackageAccess[], void, { state: RootState }>(
  'sharePackage/sharedWith/get-access',
  async (_, thunkAPI) => {
    try {
      const { signal } = thunkAPI;
      const packageId = selectSharePackageId(thunkAPI.getState());
      const { packageAccess } = await getPackageAccess(packageId, signal);
      return packageAccess;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
);
