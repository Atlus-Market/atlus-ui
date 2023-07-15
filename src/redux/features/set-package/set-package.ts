import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-step';
import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';


export interface SetPackageState {
  addPatents: {
    isSetPackageModalOpen: boolean;
    currentStep: AddPatentsStep;
    activeTab: EnterPatentsNumberTab;
  };
}

const initialState: SetPackageState = {
  addPatents: {
    isSetPackageModalOpen: false,
    currentStep: AddPatentsStep.EnterPatentsNumber,
    activeTab: EnterPatentsNumberTab.EnterManually
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
    },
    setAddPatentsActiveTab: (state, action: PayloadAction<EnterPatentsNumberTab>) => {
      state.addPatents.activeTab = action.payload;
    }
  }
});

export const {
  reset,
  showSetPackageModal,
  hideSetPackageModal,
  setAddPatentsStep,
  setAddPatentsActiveTab
} = setPackage.actions;
export default setPackage.reducer;
