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
    state.shareBroker.findRecipientsPage.contactsTab.isSearchingContacts = true;
    state.shareBroker.findRecipientsPage.contactsTab.searchValue = action.meta.arg;
    state.shareBroker.findRecipientsPage.contactsTab.activeRequestId = action.meta.requestId;
  });

  builder.addCase(searchContacts.fulfilled, (state: SharePackageState, action) => {
    if (
      action.meta.requestId !== state.shareBroker.findRecipientsPage.contactsTab.activeRequestId
    ) {
      return;
    }
    console.log('searchContacts.fulfilled:action ', action);
    state.shareBroker.findRecipientsPage.contactsTab.isSearchingContacts = false;
    state.shareBroker.findRecipientsPage.contactsTab.contacts = action.payload;
  });

  builder.addCase(searchContacts.rejected, (state: SharePackageState, action) => {
    if (
      action.meta.requestId !== state.shareBroker.findRecipientsPage.contactsTab.activeRequestId
    ) {
      return;
    }
    console.log('searchContacts.rejected:action ', action);
    state.shareBroker.findRecipientsPage.contactsTab.isSearchingContacts = false;
  });
};
