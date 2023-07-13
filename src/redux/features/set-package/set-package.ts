import { createSlice } from '@reduxjs/toolkit';


interface SetPackageState {
}

const initialState: SetPackageState = {
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
