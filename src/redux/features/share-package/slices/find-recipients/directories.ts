import { SharePackageState } from '@/redux/features/share-package/share-package';
import { PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '@/models/contact';
import { User } from '@/models/user';
import { SearchUsersResponse } from '@/api/user/search-users';

export interface DirectoryState {
  searchValue: string;
  isSearchingDirectories: boolean;
  activeRequestId: string | undefined;
  directories: User[];
  selectedDirectories: User[];
  searchPageResult: Omit<SearchUsersResponse, 'users'> | undefined;
}

export const directoriesInitialState: DirectoryState = {
  searchValue: '',
  isSearchingDirectories: false,
  activeRequestId: undefined,
  directories: [],
  selectedDirectories: [],
  searchPageResult: undefined,
};

export const directoriesReducer = {
  setDirectoriesSearchValue: (state: SharePackageState, action: PayloadAction<string>) => {
    state.findRecipientsPage.contactsTab.searchValue = action.payload;
  },

  selectDirectory: (state: SharePackageState, action: PayloadAction<User>) => {
    const contact = state.findRecipientsPage.directoriesTab.selectedDirectories.find(
      contact => contact.id === action.payload.id
    );
    // Do not add it more than once
    if (contact) {
      return;
    }
    state.findRecipientsPage.directoriesTab.selectedDirectories.push(action.payload);
  },
  removeSelectedDirectory: (
    state: SharePackageState,
    action: PayloadAction<{
      id: string;
    }>
  ) => {
    state.findRecipientsPage.directoriesTab.selectedDirectories =
      state.findRecipientsPage.directoriesTab.selectedDirectories.filter(
        contact => contact.id !== action.payload.id
      );
  },
};
