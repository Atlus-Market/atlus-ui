import { SharePackageFindRecipientsTab } from '@/app/(main)/package/share/broker/pages/find-recipients/components/common/share-package-find-recipients-tab';
import {
  contactsInitialState,
  contactsReducer,
  ContactsState,
} from '@/redux/features/share-package/slices/broker/find-recipients/contacts';
import { PayloadAction } from '@reduxjs/toolkit';
import { SharePackageState } from '@/redux/features/share-package/share-package';
import {
  directoriesInitialState,
  directoriesReducer,
  DirectoryState,
} from '@/redux/features/share-package/slices/broker/find-recipients/directories';
import { Recipient } from '@/redux/features/share-package/slices/recipient';

export interface FindRecipientsPageState {
  activeTab: SharePackageFindRecipientsTab;
  contactsTab: ContactsState;
  directoriesTab: DirectoryState;
  selectedRecipients: Recipient[];
  customRecipient: Recipient | undefined;
}

export const findRecipientsPageInitialState: FindRecipientsPageState = {
  activeTab: SharePackageFindRecipientsTab.Contacts,
  contactsTab: contactsInitialState,
  directoriesTab: directoriesInitialState,
  selectedRecipients: [],
  customRecipient: undefined,
};

export const findRecipientsReducers = {
  setSharePackageActiveTab: (
    state: SharePackageState,
    action: PayloadAction<SharePackageFindRecipientsTab>
  ) => {
    state.shareBroker.findRecipientsPage.activeTab = action.payload;
  },

  addRecipient: (state: SharePackageState, action: PayloadAction<Recipient>) => {
    // Do not add it more than once
    const recipients = state.shareBroker.findRecipientsPage.selectedRecipients.filter(
      r => r.id !== action.payload.id
    );
    recipients.push(action.payload);
    state.shareBroker.findRecipientsPage.selectedRecipients = recipients;
  },

  removeRecipient: (
    state: SharePackageState,
    action: PayloadAction<{
      id: string;
    }>
  ) => {
    state.shareBroker.findRecipientsPage.selectedRecipients =
      state.shareBroker.findRecipientsPage.selectedRecipients.filter(
        recipient => recipient.id !== action.payload.id
      );
  },

  setCustomRecipient: (state: SharePackageState, action: PayloadAction<Recipient | undefined>) => {
    state.shareBroker.findRecipientsPage.customRecipient = action.payload;
  },

  //Contacts tab
  ...contactsReducer,

  // Directories tab
  ...directoriesReducer,
};
