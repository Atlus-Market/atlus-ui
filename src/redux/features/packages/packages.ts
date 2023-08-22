import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PackageListItem } from '@/models/package-list-item';


export interface PackagesState {
  packagesList: PackageListItem[];
}

const initialState: PackagesState = {
  packagesList: []
};

export const packages = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    reset: () => initialState,
    setPackagesList: (state: PackagesState, action: PayloadAction<PackageListItem[]>) => {
      state.packagesList = action.payload;
    }
  },

  extraReducers: (builder) => {
  }
});

export const {
  reset,
  setPackagesList
} = packages.actions;
export default packages.reducer;
