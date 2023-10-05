import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import { SharePackageState } from '@/redux/features/share-package/share-package';
import { searchDirectories } from '@/redux/features/share-package/thunks/search-directories.thunk';

export const searchDirectoriesExtraReducers = (
  builder: ActionReducerMapBuilder<SharePackageState>
) => {
  builder.addCase(searchDirectories.pending, (state: SharePackageState, action) => {
    const { meta } = action;
    const payload = meta.arg;
    console.log('searchDirectories.pending:action ', action);
    state.findRecipientsPage.directoriesTab.isSearchingDirectories = true;
    state.findRecipientsPage.directoriesTab.activeRequestId = action.meta.requestId;
  });

  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(searchDirectories.fulfilled, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.findRecipientsPage.directoriesTab.activeRequestId) {
      return;
    }
    console.log('searchDirectories.fulfilled:action ', action);
    state.findRecipientsPage.directoriesTab.isSearchingDirectories = false;
    state.findRecipientsPage.directoriesTab.directories = action.payload;
  });

  builder.addCase(searchDirectories.rejected, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.findRecipientsPage.directoriesTab.activeRequestId) {
      return;
    }
    console.log('searchDirectories.rejected:action ', action);
    state.findRecipientsPage.directoriesTab.isSearchingDirectories = false;
  });
};
