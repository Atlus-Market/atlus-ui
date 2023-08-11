import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import {
  PatentsIdsForm
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-ids/patents-ids-form';
import { SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';

export type EnterPatentsIdsManuallyForm = EnterPatentsState[EnterPatentsNumberTab.EnterManually]['form'];


export interface EnterPatentsState {
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
  };
}

export const enterPatentsInitialState: EnterPatentsState = {
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
};

export const enterPatentsReducer = {
  setAddPatentsActiveTab: (state: SetPackageState, action: PayloadAction<EnterPatentsNumberTab>) => {
    state.addPatents.enterPatents.activeTab = action.payload;
  },
  updateEnterPatentsIdsManuallyForm: (state: SetPackageState, action: PayloadAction<EnterPatentsIdsManuallyForm>) => {
    state.addPatents.enterPatents[EnterPatentsNumberTab.EnterManually].form = action.payload;
  }
};