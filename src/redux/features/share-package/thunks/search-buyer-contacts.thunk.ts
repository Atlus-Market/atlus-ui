import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { getContacts } from '@/api/contacts/get-contacts';
import { Contact } from '@/models/contact';

export const searchBuyerContacts = createAsyncThunk<Contact[], string, { state: RootState }>(
  'sharePackage/buyer/contacts/search',
  async (searchValue: string, thunkAPI) => {
    try {
      const { signal } = thunkAPI;
      const { contacts } = await getContacts(searchValue, signal);
      return contacts;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
);
