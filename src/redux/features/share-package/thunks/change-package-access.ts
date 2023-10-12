import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { selectSharePackageId } from '@/redux/features/share-package/selectors/share-package.selectors';
import { changePackageAccess as changePackageAccessAPI } from '@/api/package/change-package-access';
import { PackageAccessValue } from '@/models/package-access-value';

interface ChangePackageAccessPayload {
  email: string;
  access: PackageAccessValue;
}

export const changePackageAccess = createAsyncThunk<
  void,
  ChangePackageAccessPayload,
  {
    state: RootState;
  }
>('sharePackage/sharedWith/change-package-access', async (payload, thunkAPI) => {
  try {
    const packageId = selectSharePackageId(thunkAPI.getState());
    const { email, access } = payload;
    const response = await changePackageAccessAPI(packageId, email, {
      access,
    });
    console.log('Change package access response: ', response);
    return undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
});
