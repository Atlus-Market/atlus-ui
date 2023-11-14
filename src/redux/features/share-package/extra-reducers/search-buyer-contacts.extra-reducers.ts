import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import { SharePackageState } from '@/redux/features/share-package/share-package';
import { searchBuyerContacts } from '@/redux/features/share-package/thunks/search-buyer-contacts.thunk';

export const searchBuyerContactsExtraReducers = (
  builder: ActionReducerMapBuilder<SharePackageState>
) => {
  builder.addCase(searchBuyerContacts.pending, (state: SharePackageState, action) => {
    const { meta } = action;
    const payload = meta.arg;
    state.shareBuyer.isSearchingContacts = true;
    state.shareBuyer.searchValue = action.meta.arg;
    state.shareBuyer.activeRequestId = action.meta.requestId;
  });

  builder.addCase(searchBuyerContacts.fulfilled, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.shareBuyer.activeRequestId) {
      return;
    }
    state.shareBuyer.isSearchingContacts = false;
    state.shareBuyer.contacts = action.payload;
  });

  builder.addCase(searchBuyerContacts.rejected, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.shareBuyer.activeRequestId) {
      return;
    }
    state.shareBuyer.isSearchingContacts = false;
  });
};
