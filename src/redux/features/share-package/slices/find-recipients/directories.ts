import { SharePackageState } from '@/redux/features/share-package/share-package';
import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models/user';
import { SearchUsersResponse } from '@/api/user/search-users';

export interface DirectoryState {
  searchValue: string;
  isSearchingDirectories: boolean;
  activeRequestId: string | undefined;
  directories: User[];
  searchPageResult: Omit<SearchUsersResponse, 'users'> | undefined;
}

export const directoriesInitialState: DirectoryState = {
  searchValue: '',
  isSearchingDirectories: false,
  activeRequestId: undefined,
  directories: [],
  searchPageResult: undefined,
};

export const directoriesReducer = {
  setDirectoriesSearchValue: (state: SharePackageState, action: PayloadAction<string>) => {
    state.findRecipientsPage.contactsTab.searchValue = action.payload;
  },
};
