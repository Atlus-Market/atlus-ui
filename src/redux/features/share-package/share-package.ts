import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SharePackageTab } from '@/app/package/share/commom/share-package-tab';

export interface SharePackageState {
  activeTab: SharePackageTab;
}

const initialState: SharePackageState = {
  activeTab: SharePackageTab.Contacts,
};

export const sharePackage = createSlice({
  name: 'sharePackage',
  initialState,
  reducers: {
    reset: () => initialState,
    setSharePackageActiveTab: (
      state: SharePackageState,
      payload: PayloadAction<SharePackageTab>
    ) => {
      state.activeTab = payload.payload;
    },
  },

  // extraReducers: builder => {
  //   getPackageExtraReducers(builder);
  // },
});

export const {
  // Common
  reset,
  setSharePackageActiveTab,

  // Contacts
} = sharePackage.actions;
export default sharePackage.reducer;
