import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchContactsExtraReducers } from '@/redux/features/share-package/extra-reducers/search-contacts.extra-reducers';
import { SharePackagePage } from '@/app/package/share/broker/components/commom/share-package-page';
import {
  findRecipientsPageInitialState,
  FindRecipientsPageState,
  findRecipientsReducers,
} from '@/redux/features/share-package/slices/find-recipients/find-recipients';
import { searchDirectoriesExtraReducers } from '@/redux/features/share-package/extra-reducers/search-directories.extra-reducers';

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
    setActivePage: (state: SharePackageState, action: PayloadAction<SharePackagePage>) => {
      state.activePage = action.payload;
    },
    ...findRecipientsReducers,
  },

  extraReducers: builder => {
    searchContactsExtraReducers(builder);
    searchDirectoriesExtraReducers(builder);
  },
});

export const {
  // Common
  reset,
  setActivePage,

  // Find recipients Page
  setSharePackageActiveTab,

  // Contacts tab
  setContactsSearchValue,
  selectContact,
  removeSelectedContact,

  // Directories tab
  setDirectoriesSearchValue,
  selectDirectory,
  removeSelectedDirectory,
} = sharePackage.actions;
export default sharePackage.reducer;
