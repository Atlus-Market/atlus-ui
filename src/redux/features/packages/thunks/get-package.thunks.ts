import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { getPackage } from '@/api/package/get-package';
import { Package } from '@/models/package';

export const fetchPackage = createAsyncThunk<Package, string, { state: RootState }>(
  'package/get',
  async (packageId: string, thunkAPI) => {
    try {
      const res = await getPackage(packageId, undefined, thunkAPI.signal);
      console.log('GET package Response: ', res);
      return res.package;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
