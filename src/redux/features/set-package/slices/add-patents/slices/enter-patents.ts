import { EnterPatentsNumberTab } from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import { PatentsIdsForm } from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-ids/patents-ids-form';
import { SetPackageState } from '@/redux/features/set-package/set-package';
import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { SerializedFile } from '@/redux/features/set-package/slices/documents';
import { SearchPatentsResponse } from '@/api/patents/search-patents-response';
import { cleanSerializedFile } from '@/utils/file';

export type EnterPatentsIdsManuallyForm =
  EnterPatentsState[EnterPatentsNumberTab.EnterManually]['form'];

export interface EnterPatentsState {
  activeTab: EnterPatentsNumberTab;
  [EnterPatentsNumberTab.EnterManually]: {
    form: {
      formValues: PatentsIdsForm;
      formState: {
        isValid: boolean;
      };
    };
  };
  [EnterPatentsNumberTab.ImportFromFile]: {
    selectedFile: SerializedFile | undefined;
    uploadingFile: boolean;
  };
}

export const patentsFetchedSuccessfully = createAction<SearchPatentsResponse>(
  'setPackage/patentsFetchedSuccessfully'
);

export const enterPatentsInitialState: EnterPatentsState = {
  activeTab: EnterPatentsNumberTab.EnterManually,
  [EnterPatentsNumberTab.EnterManually]: {
    form: {
      formValues: {
        patentsIds: '',
      },
      formState: {
        isValid: false,
      },
    },
  },
  [EnterPatentsNumberTab.ImportFromFile]: {
    selectedFile: undefined,
    uploadingFile: false,
  },
};

export const enterPatentsReducer = {
  setAddPatentsActiveTab: (
    state: SetPackageState,
    action: PayloadAction<EnterPatentsNumberTab>
  ) => {
    state.addPatents.enterPatentsState.activeTab = action.payload;
  },
  updateEnterPatentsIdsManuallyForm: (
    state: SetPackageState,
    action: PayloadAction<EnterPatentsIdsManuallyForm>
  ) => {
    state.addPatents.enterPatentsState[
      EnterPatentsNumberTab.EnterManually
    ].form = action.payload;
  },
  setImportPatentsFile: (
    state: SetPackageState,
    action: PayloadAction<{ file: SerializedFile }>
  ) => {
    state.addPatents.enterPatentsState[
      EnterPatentsNumberTab.ImportFromFile
    ].selectedFile = action.payload.file;
  },
  removeImportPatentsFile: (state: SetPackageState) => {
    const serializedFile =
      state.addPatents.enterPatentsState[EnterPatentsNumberTab.ImportFromFile]
        .selectedFile;
    if (serializedFile) {
      cleanSerializedFile(serializedFile);
    }
    state.addPatents.enterPatentsState[
      EnterPatentsNumberTab.ImportFromFile
    ].selectedFile = undefined;
  },
};
