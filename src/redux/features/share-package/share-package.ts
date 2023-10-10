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
  packageId: string;
  activePage: SharePackagePage;
  findRecipientsPage: FindRecipientsPageState;
  isShareModalOpen: boolean;
}

const initialState: SharePackageState = {
  packageId: '',
  activePage: SharePackagePage.FindRecipients,
  findRecipientsPage: findRecipientsPageInitialState,
  isShareModalOpen: false,
};

export const sharePackage = createSlice({
  name: 'sharePackage',
  initialState,
  reducers: {
    reset: () => initialState,
    setSharePackageId: (state: SharePackageState, action: PayloadAction<{ packageId: string }>) => {
      state.packageId = action.payload.packageId;
    },
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
  setSharePackageId,
  setActivePage,
  showSharePackageModal,
  hideSharePackageModal,

  // Find recipients Page
  setSharePackageActiveTab,
  addRecipient,
  removeRecipient,

  // Contacts tab
  setContactsSearchValue,

  // Directories tab
  setDirectoriesSearchValue,
} = sharePackage.actions;
export default sharePackage.reducer;
