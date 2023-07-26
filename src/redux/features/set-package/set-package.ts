import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-step';
import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import {
  PatentsIdsForm
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-ids/patents-ids-form';
import { Patent } from '@/models/patent';

export type FamilyPatents = {
  [familyId: string]: Patent[];
}

export interface SetPackageState {
  familyPatents: FamilyPatents;
  addPatents: {
    isAddPatentsModalOpen: boolean;
    currentStep: AddPatentsStep;
    activeTab: EnterPatentsNumberTab;
    patents: Patent[], // Fetched from the API
    enterPatents: {
      [EnterPatentsNumberTab.EnterManually]: {
        form: {
          formValues: PatentsIdsForm;
          formState: {
            isValid: boolean;
          }
        }
      };
      [EnterPatentsNumberTab.ImportFromFile]: {
        patentsIds: string[]
      }
    };
    selectPatents: {
      familyPatents: FamilyPatents;
    }
  };
}

export type EnterPatentsIdsManuallyForm = SetPackageState['addPatents']['enterPatents'][EnterPatentsNumberTab.EnterManually]['form'];

const initialState: SetPackageState = {
  familyPatents: {},
  addPatents: {
    isAddPatentsModalOpen: false,
    currentStep: AddPatentsStep.EnterPatentsNumber,
    activeTab: EnterPatentsNumberTab.EnterManually,
    patents: [],
    enterPatents: {
      [EnterPatentsNumberTab.EnterManually]: {
        form: {
          formValues: {
            patentsIds: ''
          },
          formState: {
            isValid: false
          }
        }
      },
      [EnterPatentsNumberTab.ImportFromFile]: {
        patentsIds: []
      }
    },
    selectPatents: {
      familyPatents: {}
    }
  }
};

export const setPackage = createSlice({
  name: 'setPackage',
  initialState,
  reducers: {
    reset: () => initialState,
    resetAddPatents: (state) => {
      state.addPatents = initialState.addPatents;
    },
    showAddPatentsModal: state => {
      state.addPatents.isAddPatentsModalOpen = true;
    },
    hideAddPatentsModal: state => {
      state.addPatents.isAddPatentsModalOpen = false;
    },
    setAddPatentsStep: (state, action: PayloadAction<AddPatentsStep>) => {
      state.addPatents.currentStep = action.payload;
    },
    setAddPatentsActiveTab: (state, action: PayloadAction<EnterPatentsNumberTab>) => {
      state.addPatents.activeTab = action.payload;
    },
    updateEnterPatentsIdsManuallyForm: (state, action: PayloadAction<EnterPatentsIdsManuallyForm>) => {
      state.addPatents.enterPatents[EnterPatentsNumberTab.EnterManually].form = action.payload;
    },
    selectPatents: (state, action: PayloadAction<{ patents: Patent[] }>) => {
      const familyPatents: FamilyPatents = {};
      action.payload.patents.forEach(patent => {
        const currentPatents = familyPatents[patent.familyId] || [];
        familyPatents[patent.familyId] = [...currentPatents, patent];
      });
      state.addPatents.selectPatents.familyPatents = familyPatents;
    },
    setPackagePatents: (state) => {
      const stateFamilyPatents = state.addPatents.selectPatents.familyPatents;

      Object.keys(stateFamilyPatents).forEach(familyId => {
        const familyPatents = stateFamilyPatents[familyId] || [];
        const patentsToAdd: Patent[] = [];

        familyPatents.forEach(patent => {
          const hasPatent = familyPatents.find(p => p.applicationNumber === patent.applicationNumber);
          if (!hasPatent) {
            patentsToAdd.push(patent);
          }
        });
        state.familyPatents[familyId] = [...familyPatents, ...patentsToAdd];
      });
    },
    setFetchedPatents: (state, action: PayloadAction<{ patents: Patent[] }>) => {
      state.addPatents.patents = action.payload.patents;
    }
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
