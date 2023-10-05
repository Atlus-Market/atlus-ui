import { SharePackageState } from '@/redux/features/share-package/share-package';
import { PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '@/models/contact';

export interface ContactsState {
  searchValue: string;
  isSearchingContacts: boolean;
  activeRequestId: string | undefined;
  contacts: Contact[];
  selectedContacts: Contact[];
}

export const contactsInitialState: ContactsState = {
  searchValue: '',
  isSearchingContacts: false,
  activeRequestId: undefined,
  contacts: [],
  selectedContacts: [],
};

export const contactsReducer = {
  setContactsSearchValue: (state: SharePackageState, action: PayloadAction<string>) => {
    state.findRecipientsPage.contactsTab.searchValue = action.payload;
  },

  selectContact: (state: SharePackageState, action: PayloadAction<Contact>) => {
    const contact = state.findRecipientsPage.contactsTab.selectedContacts.find(
      contact => contact.id === action.payload.id
    );
    // Do not add it more than once
    if (contact) {
      return;
    }
    state.findRecipientsPage.contactsTab.selectedContacts.push(action.payload);
  },
  removeSelectedContact: (
    state: SharePackageState,
    action: PayloadAction<{
      id: string;
    }>
  ) => {
    state.findRecipientsPage.contactsTab.selectedContacts =
      state.findRecipientsPage.contactsTab.selectedContacts.filter(
        contact => contact.id !== action.payload.id
      );
  },
};
