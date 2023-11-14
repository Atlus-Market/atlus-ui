import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchContactsExtraReducers } from '@/redux/features/share-package/extra-reducers/search-contacts.extra-reducers';
import { SharePackagePage } from '@/app/package/share/broker/components/commom/share-package-page';
import {
  findRecipientsPageInitialState,
  FindRecipientsPageState,
  findRecipientsReducers,
} from '@/redux/features/share-package/slices/find-recipients/find-recipients';
import { searchDirectoriesExtraReducers } from '@/redux/features/share-package/extra-reducers/search-directories.extra-reducers';
import {
  sharedWithInitialState,
  sharedWithReducer,
  SharedWithState,
} from '@/redux/features/share-package/slices/shared-with';
import { fetchPackageAccessExtraReducers } from '@/redux/features/share-package/extra-reducers/fetch-package-access.extra-reducers';
import { changePackageAccessExtraReducers } from '@/redux/features/share-package/extra-reducers/change-package-access.extra-reducers';
import {
  shareBuyerInitialState,
  shareBuyerReducer,
  ShareBuyerState,
} from '@/redux/features/share-package/slices/buyer/share-buyer';
import { searchBuyerContactsExtraReducers } from '@/redux/features/share-package/extra-reducers/search-buyer-contacts.extra-reducers';

export interface SharePackageState {
  packageId: string;
  isShareModalOpen: boolean;

  // Broker
  activePage: SharePackagePage;
  findRecipientsPage: FindRecipientsPageState;
  sharedWithPage: SharedWithState;

  // Buyer
  shareBuyer: ShareBuyerState;
}

const initialState: SharePackageState = {
  packageId: '',
  isShareModalOpen: false,

  // Broker
  activePage: SharePackagePage.FindRecipients,
  findRecipientsPage: findRecipientsPageInitialState,
  sharedWithPage: sharedWithInitialState,

  // Buyer
  shareBuyer: shareBuyerInitialState,
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
    ...sharedWithReducer,
    ...shareBuyerReducer,
  },

  extraReducers: builder => {
    searchContactsExtraReducers(builder);
    searchDirectoriesExtraReducers(builder);
    fetchPackageAccessExtraReducers(builder);
    changePackageAccessExtraReducers(builder);
    searchBuyerContactsExtraReducers(builder);
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
  setCustomRecipient,

  // Contacts tab
  resetContactsSearch,

  // Directories tab
  resetDirectoriesSearch,

  // SharedWith
} = sharePackage.actions;
export default sharePackage.reducer;
