import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { selectSharePackageId } from '@/redux/features/share-package/selectors/share-package.selectors';
import { changePackageAccess as changePackageAccessAPI } from '@/api/package/access/change-package-access';
import { PackageAccessValue } from '@/models/package-access-value';

interface ChangePackageAccessPayload {
  email: string;
  access: PackageAccessValue;
}

export interface ChangePackageAccessResultPayload {
  email: string;
  access: PackageAccessValue;
}

export const changePackageAccess = createAsyncThunk<
  ChangePackageAccessResultPayload,
  ChangePackageAccessPayload,
  {
    state: RootState;
  }
>('sharePackage/sharedWith/change-package-access', async (payload, thunkAPI) => {
  try {
    const packageId = selectSharePackageId(thunkAPI.getState());
    const { email, access } = payload;
    await changePackageAccessAPI(packageId, email, {
      access,
    });
  } catch (e) {
    console.error(e);
  } finally {
    return {
      email: payload.email,
      access: payload.access,
    };
  }
});
