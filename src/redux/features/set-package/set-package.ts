import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-step';


export interface SetPackageState {
  addPatents: {
    isSetPackageModalOpen: boolean;
    currentStep: AddPatentsStep;
  };
}

const initialState: SetPackageState = {
  addPatents: {
    isSetPackageModalOpen: false,
    currentStep: AddPatentsStep.EnterPatentsNumber
  }
};

export const setPackage = createSlice({
  name: 'setPackage',
  initialState,
  reducers: {
    reset: () => initialState,
    showSetPackageModal: state => {
      state.addPatents.isSetPackageModalOpen = true;
    },
    hideSetPackageModal: state => {
      state.addPatents.isSetPackageModalOpen = false;
    },
    setAddPatentsStep: (state, action: PayloadAction<AddPatentsStep>) => {
      state.addPatents.currentStep = action.payload;
    }
  }
});

export const {
  reset,
  showSetPackageModal,
  hideSetPackageModal,
  setAddPatentsStep
} = setPackage.actions;
export default setPackage.reducer;
