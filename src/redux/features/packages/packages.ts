import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PackageListItem } from '@/models/package-list-item';
import { getPackageExtraReducers } from '@/redux/features/packages/packages-extra-reducers';

export interface PackagesState {
  packagesList: PackageListItem[];
  fetchingPackage: Record<string, boolean>;
}

const initialState: PackagesState = {
  packagesList: [],
  fetchingPackage: {},
};

export const packages = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    reset: () => initialState,
    setPackagesList: (state: PackagesState, action: PayloadAction<PackageListItem[]>) => {
      state.packagesList = action.payload;
    },
  },

  extraReducers: builder => {
    getPackageExtraReducers(builder);
  },
});

export const { reset, setPackagesList } = packages.actions;
export default packages.reducer;
