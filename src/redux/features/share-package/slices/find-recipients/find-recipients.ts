import { SharePackageFindRecipientsTab } from '@/app/package/share/broker/pages/find-recipients/components/common/share-package-find-recipients-tab';
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
import { Recipient } from '@/redux/features/share-package/slices/find-recipients/recipient';

export interface FindRecipientsPageState {
  activeTab: SharePackageFindRecipientsTab;
  contactsTab: ContactsState;
  directoriesTab: DirectoryState;
  selectedRecipients: Recipient[];
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

  addRecipient: (state: SharePackageState, action: PayloadAction<Recipient>) => {
    // Do not add it more than once
    const recipients = state.findRecipientsPage.selectedRecipients.filter(
      r => r.id !== action.payload.id
    );
    recipients.push(action.payload);
    state.findRecipientsPage.selectedRecipients = recipients;
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
