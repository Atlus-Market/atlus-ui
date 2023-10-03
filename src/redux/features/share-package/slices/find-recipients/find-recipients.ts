import { SharePackageFindRecipientsTab } from '@/app/package/share/commom/share-package-find-recipients-tab';
import {
  contactsInitialState,
  contactsReducer,
  ContactsState,
} from '@/redux/features/share-package/slices/find-recipients/contacts';
import { PayloadAction } from '@reduxjs/toolkit';
import { SharePackageState } from '@/redux/features/share-package/share-package';

export interface FindRecipientsPageState {
  activeTab: SharePackageFindRecipientsTab;
  contactsTab: ContactsState;
}

export const findRecipientsPageInitialState: FindRecipientsPageState = {
  activeTab: SharePackageFindRecipientsTab.Contacts,
  contactsTab: contactsInitialState,
};

export const findRecipientsReducers = {
  setSharePackageActiveTab: (
    state: SharePackageState,
    action: PayloadAction<SharePackageFindRecipientsTab>
  ) => {
    state.findRecipientsPage.activeTab = action.payload;
  },

  //Contacts tabs
  ...contactsReducer,
};
