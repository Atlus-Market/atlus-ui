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
    state.contactsTab.isSearchContacts = true;
  });

  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(searchContacts.fulfilled, (state: SharePackageState, action) => {
    console.log('searchContacts.fulfilled:action ', action);
    state.contactsTab.isSearchContacts = false;
  });
  builder.addCase(searchContacts.rejected, (state: SharePackageState, action) => {
    console.log('searchContacts.rejected:action ', action);
    state.contactsTab.isSearchContacts = false;
  });
};
