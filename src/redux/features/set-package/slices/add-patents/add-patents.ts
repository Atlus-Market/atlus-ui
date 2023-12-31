import { AddPatentsStep } from '@/app/set-package/(pages)/patents/components/add-patents/add-patents-step';
import { Patent } from '@/models/patent';
import { SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  enterPatentsInitialState,
  enterPatentsReducer,
  EnterPatentsState,
} from '@/redux/features/set-package/slices/add-patents/slices/enter-patents';
import {
  selectPatentesReducer,
  selectPatentsInitialState,
  SelectPatentsState,
} from '@/redux/features/set-package/slices/add-patents/slices/select-patents';
import { EnterPatentsNumberTab } from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import { cleanSerializedFile } from '@/utils/file';
import { getPatentId } from '@/utils/patents';

export interface AddPatentsState {
  isAddPatentsModalOpen: boolean;
  currentStep: AddPatentsStep;
  fetchedPatents: Patent[]; // Fetched from the API
  enterPatentsState: EnterPatentsState;
  selectPatentsState: SelectPatentsState;
}

export const addPatentsInitialState: AddPatentsState = {
  isAddPatentsModalOpen: false,
  currentStep: AddPatentsStep.EnterPatentsNumber,
  fetchedPatents: [],
  enterPatentsState: enterPatentsInitialState,
  selectPatentsState: selectPatentsInitialState,
};

export const addPatentesReducer = {
  resetAddPatents: (state: SetPackageState) => {
    const serializedImportSelectedFile =
      state.addPatents.enterPatentsState[EnterPatentsNumberTab.ImportFromFile].selectedFile;
    if (serializedImportSelectedFile) {
      cleanSerializedFile(serializedImportSelectedFile);
    }
    state.addPatents = addPatentsInitialState;
  },
  setAddPatentsStep: (state: SetPackageState, action: PayloadAction<AddPatentsStep>) => {
    state.addPatents.currentStep = action.payload;
  },
  setPatents: (state: SetPackageState, action: PayloadAction<{ patents: Patent[] }>) => {
    state.addPatents.fetchedPatents = action.payload.patents;
  },

  // Replaces a Patent
  updatePatent: (state: SetPackageState, action: PayloadAction<{ patent: Patent }>) => {
    const patents = state.addPatents.fetchedPatents.filter(
      (patent: Patent) => getPatentId(patent) !== getPatentId(action.payload.patent)
    );
    state.addPatents.fetchedPatents = [...patents, action.payload.patent];
  },

  ...enterPatentsReducer,
  ...selectPatentesReducer,
};
