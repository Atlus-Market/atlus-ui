import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchContactsExtraReducers } from '@/redux/features/share-package/extra-reducers/search-contacts.extra-reducers';
import { SharePackagePage } from '@/app/package/share/broker/components/commom/share-package-page';
import {
  findRecipientsPageInitialState,
  FindRecipientsPageState,
  findRecipientsReducers,
} from '@/redux/features/share-package/slices/find-recipients/find-recipients';
import { searchDirectoriesExtraReducers } from '@/redux/features/share-package/extra-reducers/search-directories.extra-reducers';

export interface SharePackageState {
  activePage: SharePackagePage;
  findRecipientsPage: FindRecipientsPageState;
  isShareModalOpen: boolean;
}

const initialState: SharePackageState = {
  activePage: SharePackagePage.FindRecipients,
  findRecipientsPage: findRecipientsPageInitialState,
  isShareModalOpen: false,
};

export const sharePackage = createSlice({
  name: 'sharePackage',
  initialState,
  reducers: {
    reset: () => initialState,
    showSharePackageModal: (state: SharePackageState) => {
      state.isShareModalOpen = true;
    },
    hideSharePackageModal: (state: SharePackageState) => {
      state.isShareModalOpen = false;
    },
    setActivePage: (state: SharePackageState, action: PayloadAction<SharePackagePage>) => {
      state.activePage = action.payload;
    },
    ...findRecipientsReducers,
  },

  extraReducers: builder => {
    searchContactsExtraReducers(builder);
    searchDirectoriesExtraReducers(builder);
  },
});

export const {
  // Common
  reset,
  setActivePage,
  showSharePackageModal,
  hideSharePackageModal,

  // Find recipients Page
  setSharePackageActiveTab,

  // Contacts tab
  setContactsSearchValue,
  selectContact,
  removeSelectedContact,

  // Directories tab
  setDirectoriesSearchValue,
  selectDirectory,
  removeSelectedDirectory,
} = sharePackage.actions;
export default sharePackage.reducer;
