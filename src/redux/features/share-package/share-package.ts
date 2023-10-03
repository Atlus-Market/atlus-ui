import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SharePackageTab } from '@/app/package/share/commom/share-package-tab';
import {
  contactsInitialState,
  contactsReducer,
  ContactsState,
} from '@/redux/features/share-package/slices/contacts';
import { searchContactsExtraReducers } from '@/redux/features/share-package/extra-reducers/search-contacts.extra-reducers';

export interface SharePackageState {
  activeTab: SharePackageTab;
  contactsTab: ContactsState;
}

const initialState: SharePackageState = {
  activeTab: SharePackageTab.Contacts,
  contactsTab: contactsInitialState,
};

export const sharePackage = createSlice({
  name: 'sharePackage',
  initialState,
  reducers: {
    reset: () => initialState,
    setSharePackageActiveTab: (
      state: SharePackageState,
      action: PayloadAction<SharePackageTab>
    ) => {
      state.activeTab = action.payload;
    },

    //Contacts tabs
    ...contactsReducer,
  },

  extraReducers: builder => {
    searchContactsExtraReducers(builder);
  },
});

export const {
  // Common
  reset,
  setSharePackageActiveTab,

  // Contacts
  setContactsSearchValue,
} = sharePackage.actions;
export default sharePackage.reducer;
