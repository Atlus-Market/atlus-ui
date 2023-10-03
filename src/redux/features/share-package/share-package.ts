import { createSlice } from '@reduxjs/toolkit';
import { searchContactsExtraReducers } from '@/redux/features/share-package/extra-reducers/search-contacts.extra-reducers';
import { SharePackagePage } from '@/app/package/share/commom/share-package-page';
import {
  findRecipientsPageInitialState,
  FindRecipientsPageState,
  findRecipientsReducers,
} from '@/redux/features/share-package/slices/find-recipients/find-recipients';

export interface SharePackageState {
  activePage: SharePackagePage;
  findRecipientsPage: FindRecipientsPageState;
}

const initialState: SharePackageState = {
  activePage: SharePackagePage.FindRecipients,
  findRecipientsPage: findRecipientsPageInitialState,
};

export const sharePackage = createSlice({
  name: 'sharePackage',
  initialState,
  reducers: {
    reset: () => initialState,
    ...findRecipientsReducers,
  },

  extraReducers: builder => {
    searchContactsExtraReducers(builder);
  },
});

export const {
  // Common
  reset,

  // Find recipients Page
  setSharePackageActiveTab,
  // // Contacts
  setContactsSearchValue,
} = sharePackage.actions;
export default sharePackage.reducer;
