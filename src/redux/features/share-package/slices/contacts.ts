import { SharePackageState } from '@/redux/features/share-package/share-package';
import { PayloadAction } from '@reduxjs/toolkit';

export interface ContactsState {
  searchValue: string;
  isSearchContacts: boolean;
}

export const contactsInitialState: ContactsState = {
  searchValue: '',
  isSearchContacts: false,
};

export const contactsReducer = {
  setContactsSearchValue: (state: SharePackageState, action: PayloadAction<string>) => {
    state.contactsTab.searchValue = action.payload;
  },
};
