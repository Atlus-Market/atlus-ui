import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-step';
import { Patent } from '@/models/patent';
import { SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  enterPatentsInitialState,
  enterPatentsReducer,
  EnterPatentsState
} from '@/redux/features/set-package/slices/add-patents/slices/enter-patents';
import {
  selectPatentesReducer,
  selectPatentsInitialState,
  SelectPatentsState
} from '@/redux/features/set-package/slices/add-patents/slices/select-patents';

export interface AddPatentsState {
  isAddPatentsModalOpen: boolean;
  currentStep: AddPatentsStep;

  patents: Patent[], // Fetched from the API
  enterPatents: EnterPatentsState;
  selectPatents: SelectPatentsState;
}

export const addPatentsInitialState: AddPatentsState = {
  isAddPatentsModalOpen: false,
  currentStep: AddPatentsStep.EnterPatentsNumber,
  patents: [],
  enterPatents: enterPatentsInitialState,
  selectPatents: selectPatentsInitialState
};

export const addPatentesReducer = {
  resetAddPatents: (state: SetPackageState) => {
    state.addPatents = addPatentsInitialState;
  },
  setAddPatentsStep: (state: SetPackageState, action: PayloadAction<AddPatentsStep>) => {
    state.addPatents.currentStep = action.payload;
  },
  setPatents: (state: SetPackageState, action: PayloadAction<{ patents: Patent[] }>) => {
    state.addPatents.patents = action.payload.patents;
  },

  // After finishing selecting patents from the table
  setPackagePatents: (state: SetPackageState) => {
    const stateFamilyPatents = state.addPatents.selectPatents.familyPatents;

    Object.keys(stateFamilyPatents).forEach(familyId => {
      const familyPatents = stateFamilyPatents[familyId] || [];
      const patentsToAdd: Patent[] = [];

      familyPatents.forEach((patent: Patent) => {
        const hasPatent = familyPatents.find((p: Patent) => p.applicationNumber === patent.applicationNumber);
        if (!hasPatent) {
          patentsToAdd.push(patent);
        }
      });
      state.familyPatents[familyId] = [...familyPatents, ...patentsToAdd];
    });
  },

  // Replaces a Patent
  updatePatent: (state: SetPackageState, action: PayloadAction<{ patent: Patent }>) => {
    const patents = state.addPatents.patents.filter((patent: Patent) => patent.publicationNumber !== action.payload.patent.publicationNumber);
    state.addPatents.patents = [
      ...patents,
      action.payload.patent
    ];
  },

  ...enterPatentsReducer,
  ...selectPatentesReducer
};
