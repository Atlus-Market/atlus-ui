import { SharePackageState } from '@/redux/features/share-package/share-package';
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
  resetContactsSearch: (state: SharePackageState) => {
    state.findRecipientsPage.contactsTab.searchValue = '';
    state.findRecipientsPage.contactsTab.contacts = [];
  },
};
