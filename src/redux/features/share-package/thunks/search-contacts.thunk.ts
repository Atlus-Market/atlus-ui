import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { getContacts } from '@/api/contacts/get-contacts';
import { Contact } from '@/models/contact';

export const searchContacts = createAsyncThunk<Contact[], string, { state: RootState }>(
  'sharePackage/contacts/search',
  async (searchValue: string, thunkAPI) => {
    try {
      const { signal } = thunkAPI;
      console.log('searching contacts value: ', searchValue);
      const res = await getContacts(searchValue, signal);
      console.log('Search contacts response: ', res);
      return res.contacts;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
);
