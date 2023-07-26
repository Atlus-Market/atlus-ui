import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-step';
import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import { Patent } from '@/models/patent';
import {
  addPatentesReducer,
  AddPatents,
  addPatentsInitialState
} from '@/redux/features/set-package/add-patents';

export type FamilyPatents = {
  [familyId: string]: Patent[];
}

export interface SetPackageState {
  familyPatents: FamilyPatents;
  addPatents: AddPatents;
}

export type EnterPatentsIdsManuallyForm = SetPackageState['addPatents']['enterPatents'][EnterPatentsNumberTab.EnterManually]['form'];

const initialState: SetPackageState = {
  familyPatents: {},
  addPatents: addPatentsInitialState
};

export const setPackage = createSlice({
  name: 'setPackage',
  initialState,
  reducers: {
    reset: () => initialState,
    showAddPatentsModal: state => {
      state.addPatents.isAddPatentsModalOpen = true;
    },
    hideAddPatentsModal: state => {
      state.addPatents.isAddPatentsModalOpen = false;
    },
    ...addPatentesReducer,
  }
});

export const {
  reset,
  resetAddPatents,
  showAddPatentsModal,
  hideAddPatentsModal,
  setAddPatentsStep,
  setAddPatentsActiveTab,
  updateEnterPatentsIdsManuallyForm,
  selectPatents,
  setPackagePatents,
  setFetchedPatents
} = setPackage.actions;
export default setPackage.reducer;
