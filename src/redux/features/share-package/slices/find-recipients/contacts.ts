import { SharePackageState } from '@/redux/features/share-package/share-package';
import { PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '@/models/contact';

export interface ContactsState {
  searchValue: string;
  isSearchingContacts: boolean;
  activeRequestId: string | undefined;
  contacts: Contact[];
}

export const contactsInitialState: ContactsState = {
  searchValue: '',
  isSearchingContacts: false,
  activeRequestId: undefined,
  contacts: [],
};

export const contactsReducer = {
  setContactsSearchValue: (state: SharePackageState, action: PayloadAction<string>) => {
    state.findRecipientsPage.contactsTab.searchValue = action.payload;
  },
};
