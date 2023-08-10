import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-step';
import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import { Patent } from '@/models/patent';
import {
  PatentsIdsForm
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-ids/patents-ids-form';
import {
  EnterPatentsIdsManuallyForm,
  FamilyPatents,
  SetPackageState
} from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';

export interface AddPatents {
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
    isSetPatentModalOpen: boolean;
    editingPublicationNumber: string | undefined;
    familyPatents: FamilyPatents;
  }
}

export const addPatentsInitialState: AddPatents = {
  isAddPatentsModalOpen: false,
  currentStep: AddPatentsStep.SelectPatents,
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
    isSetPatentModalOpen: false,
    editingPublicationNumber: undefined,
    familyPatents: {}
  }
};


export const addPatentesReducer = {
  resetAddPatents: (state: SetPackageState) => {
    state.addPatents = addPatentsInitialState;
  },
  setAddPatentsStep: (state: SetPackageState, action: PayloadAction<AddPatentsStep>) => {
    state.addPatents.currentStep = action.payload;
  },

  // Enter Patents Page
  setAddPatentsActiveTab: (state: SetPackageState, action: PayloadAction<EnterPatentsNumberTab>) => {
    state.addPatents.activeTab = action.payload;
  },
  updateEnterPatentsIdsManuallyForm: (state: SetPackageState, action: PayloadAction<EnterPatentsIdsManuallyForm>) => {
    state.addPatents.enterPatents[EnterPatentsNumberTab.EnterManually].form = action.payload;
  },
  setFetchedPatents: (state: SetPackageState, action: PayloadAction<{ patents: Patent[] }>) => {
    state.addPatents.patents = action.payload.patents;
  },

  // Select Patents Page
  // Set Patents from the table
  selectPatents: (state: SetPackageState, action: PayloadAction<{ patents: Patent[] }>) => {
    const familyPatents: FamilyPatents = {};
    action.payload.patents.forEach(patent => {
      const currentPatents = familyPatents[patent.familyId] || [];
      familyPatents[patent.familyId] = [...currentPatents, patent];
    });
    state.addPatents.selectPatents.familyPatents = familyPatents;
  },

  showSetPatentModal: (state: SetPackageState) => {
    state.addPatents.selectPatents.isSetPatentModalOpen = true;
  },
  hideSetPatentModal: (state: SetPackageState) => {
    state.addPatents.selectPatents.isSetPatentModalOpen = false;
  },
  setEditingPublicationNumber: (state: SetPackageState, action: PayloadAction<{
    publicationNumber: string
  }>) => {
    state.addPatents.selectPatents.editingPublicationNumber = action.payload.publicationNumber;
  },

  // After finishing selecting patents from the table
  setPackagePatents: (state: SetPackageState) => {
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

  // Patent
  updatePatent: (state: SetPackageState, action: PayloadAction<{ patent: Patent }>) => {
    const patents = state.addPatents.patents.filter(patent => patent.publicationNumber !== action.payload.patent.publicationNumber);
    state.addPatents.patents = [
      ...patents,
      action.payload.patent
    ];
  }
};
