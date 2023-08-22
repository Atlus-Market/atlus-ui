import { createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '@/utils/sleep';

export const persistPackage = createAsyncThunk(
  'setPackage/persist',
  async (args, thunkAPI) => {
    try {
      // const res = await createPackage({});
      const res = await sleep(2000);
      console.log('Set package Response: ', res);
    } catch (e) {
      console.error(e);
    }
  }
);
