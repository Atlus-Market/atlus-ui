import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { sleep } from '@/utils/sleep';

export const searchContacts = createAsyncThunk<void, string, { state: RootState }>(
  'sharePackage/contacts/search',
  async (searchValue: string, thunkAPI) => {
    try {
      console.log('searching contacts value: ', searchValue);
      const res = await sleep(2000);
      console.log('Search contacts response: ', res);
    } catch (e) {
      console.error(e);
    }
  }
);
