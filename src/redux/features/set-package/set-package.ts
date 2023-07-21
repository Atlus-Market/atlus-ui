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


export interface SetPackageState {
  addPatents: {
    isSetPackageModalOpen: boolean;
    currentStep: AddPatentsStep;
    activeTab: EnterPatentsNumberTab;
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
}

export type EnterPatentsIdsManuallyForm = SetPackageState['addPatents'][EnterPatentsNumberTab.EnterManually]['form'];

const initialState: SetPackageState = {
  addPatents: {
    isSetPackageModalOpen: false,
    currentStep: AddPatentsStep.SelectPatents,
    activeTab: EnterPatentsNumberTab.EnterManually,
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
    },
    updateEnterPatentsIdsManuallyForm: (state, action: PayloadAction<EnterPatentsIdsManuallyForm>) => {
      state.addPatents[EnterPatentsNumberTab.EnterManually].form = action.payload;
    }
  }
});

export const {
  reset,
  showSetPackageModal,
  hideSetPackageModal,
  setAddPatentsStep,
  setAddPatentsActiveTab,
  updateEnterPatentsIdsManuallyForm
} = setPackage.actions;
export default setPackage.reducer;
