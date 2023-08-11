import { createSlice } from '@reduxjs/toolkit';
import { Patent } from '@/models/patent';
import {
  packageDetailsInitialState,
  packageDetailsReducer,
  PackageDetailsState
} from '@/redux/features/set-package/slices/package-details';
import {
  addPatentesReducer,
  addPatentsInitialState,
  AddPatentsState
} from '@/redux/features/set-package/slices/add-patents/add-patents';

export type FamilyPatents = {
  [familyId: string]: Patent[];
}

export interface SetPackageState {
  familyPatents: FamilyPatents;
  addPatents: AddPatentsState;
  packageDetails: PackageDetailsState;
}

const initialState: SetPackageState = {
  familyPatents: {},
  addPatents: addPatentsInitialState,
  packageDetails: packageDetailsInitialState
};

export const setPackage = createSlice({
  name: 'setPackage',
  initialState,
  reducers: {
    reset: () => initialState,
    showAddPatentsModal: (state: SetPackageState) => {
      state.addPatents.isAddPatentsModalOpen = true;
    },
    hideAddPatentsModal: (state: SetPackageState) => {
      state.addPatents.isAddPatentsModalOpen = false;
    },
    ...addPatentesReducer,
    ...packageDetailsReducer
  }
});

export const {
  reset,
  resetAddPatents,
  updatePatent,
  showAddPatentsModal,
  hideAddPatentsModal,
  setAddPatentsStep,
  setAddPatentsActiveTab,
  updateEnterPatentsIdsManuallyForm,
  selectPatents,
  setPackagePatents,
  setPatents,
  setPackageDetails,
  showSetContactModal,
  hideSetContactModal,
  setContact,
  setActiveContact,
  setContacts,
  showSetPatentModal,
  hideSetPatentModal,
  setEditingPatent
} = setPackage.actions;
export default setPackage.reducer;
