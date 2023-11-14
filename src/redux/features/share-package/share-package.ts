import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchContactsExtraReducers } from '@/redux/features/share-package/extra-reducers/search-contacts.extra-reducers';
import { searchDirectoriesExtraReducers } from '@/redux/features/share-package/extra-reducers/search-directories.extra-reducers';
import { fetchPackageAccessExtraReducers } from '@/redux/features/share-package/extra-reducers/fetch-package-access.extra-reducers';
import { changePackageAccessExtraReducers } from '@/redux/features/share-package/extra-reducers/change-package-access.extra-reducers';
import {
  shareBuyerInitialState,
  shareBuyerReducer,
  ShareBuyerState,
} from '@/redux/features/share-package/slices/buyer/share-buyer';
import { searchBuyerContactsExtraReducers } from '@/redux/features/share-package/extra-reducers/search-buyer-contacts.extra-reducers';
import {
  shareBrokerInitialState,
  shareBrokerReducer,
  ShareBrokerState,
} from '@/redux/features/share-package/slices/broker/share-broker';

export interface SharePackageState {
  packageId: string;
  isPrivatePackage: boolean;
  isShareModalOpen: boolean;

  // Broker
  shareBroker: ShareBrokerState;

  // Buyer
  shareBuyer: ShareBuyerState;
}

const initialState: SharePackageState = {
  packageId: '',
  isPrivatePackage: true,
  isShareModalOpen: false,

  // Broker
  shareBroker: shareBrokerInitialState,

  // Buyer
  shareBuyer: shareBuyerInitialState,
};

export const sharePackage = createSlice({
  name: 'sharePackage',
  initialState,
  reducers: {
    reset: () => initialState,
    setSharePackageData: (
      state: SharePackageState,
      action: PayloadAction<{ packageId: string; isPrivatePackage: boolean }>
    ) => {
      state.packageId = action.payload.packageId;
      state.isPrivatePackage = action.payload.isPrivatePackage;
    },
    showSharePackageModal: (state: SharePackageState) => {
      state.isShareModalOpen = true;
    },
    hideSharePackageModal: (state: SharePackageState) => {
      state.isShareModalOpen = false;
    },

    ...shareBrokerReducer,
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
  setSharePackageData,
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
