import { createSlice } from '@reduxjs/toolkit';
import { Patent } from '@/models/patent';


interface SetPackageState {
  patents: Patent[];
}

const initialState: SetPackageState = {
  patents: []
};

export const setPackage = createSlice({
  name: 'setPackage',
  initialState,
  reducers: {
    reset: () => initialState
  }
});

export const {
  reset
} = setPackage.actions;
export default setPackage.reducer;
