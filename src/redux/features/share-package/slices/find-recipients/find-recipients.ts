import { SharePackageFindRecipientsTab } from '@/app/package/share/broker/components/commom/share-package-find-recipients-tab';
import {
  contactsInitialState,
  contactsReducer,
  ContactsState,
} from '@/redux/features/share-package/slices/find-recipients/contacts';
import { PayloadAction } from '@reduxjs/toolkit';
import { SharePackageState } from '@/redux/features/share-package/share-package';
import {
  directoriesInitialState,
  directoriesReducer,
  DirectoryState,
} from '@/redux/features/share-package/slices/find-recipients/directories';
import { Contact } from '@/models/contact';
import { User } from '@/models/user';

export interface FindRecipientsPageState {
  activeTab: SharePackageFindRecipientsTab;
  contactsTab: ContactsState;
  directoriesTab: DirectoryState;
  selectedRecipients: (Contact | User)[];
}

export const findRecipientsPageInitialState: FindRecipientsPageState = {
  activeTab: SharePackageFindRecipientsTab.Contacts,
  contactsTab: contactsInitialState,
  directoriesTab: directoriesInitialState,
  selectedRecipients: [],
};

export const findRecipientsReducers = {
  setSharePackageActiveTab: (
    state: SharePackageState,
    action: PayloadAction<SharePackageFindRecipientsTab>
  ) => {
    state.findRecipientsPage.activeTab = action.payload;
  },

  addRecipient: (state: SharePackageState, action: PayloadAction<Contact | User>) => {
    const recipient = state.findRecipientsPage.selectedRecipients.find(
      r => r.id === action.payload.id
    );
    // Do not add it more than once
    if (recipient) {
      return;
    }
    state.findRecipientsPage.selectedRecipients.push(action.payload);
  },

  removeRecipient: (
    state: SharePackageState,
    action: PayloadAction<{
      id: string;
    }>
  ) => {
    state.findRecipientsPage.selectedRecipients =
      state.findRecipientsPage.selectedRecipients.filter(
        recipient => recipient.id !== action.payload.id
      );
  },

  //Contacts tab
  ...contactsReducer,

  // Directories tab
  ...directoriesReducer,
};
