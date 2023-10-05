import { SharePackageFindRecipientsTab } from '@/app/package/share/commom/share-package-find-recipients-tab';
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

export interface FindRecipientsPageState {
  activeTab: SharePackageFindRecipientsTab;
  contactsTab: ContactsState;
  directoriesTab: DirectoryState;
}

export const findRecipientsPageInitialState: FindRecipientsPageState = {
  activeTab: SharePackageFindRecipientsTab.Contacts,
  contactsTab: contactsInitialState,
  directoriesTab: directoriesInitialState,
};

export const findRecipientsReducers = {
  setSharePackageActiveTab: (
    state: SharePackageState,
    action: PayloadAction<SharePackageFindRecipientsTab>
  ) => {
    state.findRecipientsPage.activeTab = action.payload;
  },

  //Contacts tab
  ...contactsReducer,

  // Directories tab
  ...directoriesReducer,
};
