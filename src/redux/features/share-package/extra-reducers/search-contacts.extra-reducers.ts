import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import { searchContacts } from '@/redux/features/share-package/thunks/search-contacts.thunk';
import { SharePackageState } from '@/redux/features/share-package/share-package';

export const searchContactsExtraReducers = (
  builder: ActionReducerMapBuilder<SharePackageState>
) => {
  builder.addCase(searchContacts.pending, (state: SharePackageState, action) => {
    const { meta } = action;
    const payload = meta.arg;
    console.log('searchContacts.pending:action ', action);
    state.findRecipientsPage.contactsTab.isSearchContacts = true;
    state.findRecipientsPage.contactsTab.activeRequestId = action.meta.requestId;
  });

  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(searchContacts.fulfilled, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.findRecipientsPage.contactsTab.activeRequestId) {
      return;
    }
    console.log('searchContacts.fulfilled:action ', action);
    state.findRecipientsPage.contactsTab.isSearchContacts = false;
    state.findRecipientsPage.contactsTab.contacts = action.payload;
  });

  builder.addCase(searchContacts.rejected, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.findRecipientsPage.contactsTab.activeRequestId) {
      return;
    }
    console.log('searchContacts.rejected:action ', action);
    state.findRecipientsPage.contactsTab.isSearchContacts = false;
  });
};
