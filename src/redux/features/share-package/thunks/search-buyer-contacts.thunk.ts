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

      const l = searchValue.length;
      const c: Contact[] = [];

      // return c;
      for (let i = 0; i < l; i++) {
        const id = Math.random().toString();
        c.push({
          id,
          email: `email-${id}@a.com`,
          companyName: `company-${i}@a.com`,
          firstName: `firstName - ${i}`,
          lastName: `lastName - ${i}`,
          phoneNumber: 'a',
        });
      }
      return c;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
);
