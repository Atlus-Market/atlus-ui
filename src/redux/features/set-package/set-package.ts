import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
import { Package } from '@/models/package';
import {
  createDocumentsExtraReducers,
  documentsInitialState,
  documentsReducer,
  DocumentsState
} from '@/redux/features/set-package/slices/documents';
import {
  createSetPackageExtraReducers
} from '@/redux/features/set-package/set-package-extra-reducers';
import { mergeArrays } from '@/utils/patents';
import {
  dropdownPrivateOption,
  dropdownPublicOption
} from '@/components/common/dropdown/visibility-options';
import {
  enterPatentsExtraReducers
} from '@/redux/features/set-package/slices/add-patents/slices/enter-patents-extra-reducers';


export interface SetPackageState {
  // Edit Patent
  isEditPatentModalOpen: boolean;
  editingPatentId: string | undefined;

  addPatents: AddPatentsState;
  packageDetails: PackageDetailsState;
  documents: DocumentsState;

  package: Package | undefined;
  patents: Patent[];
  isPersistingPackage: boolean;
}

const initialState: SetPackageState = {
  // Edit Patent
  isEditPatentModalOpen: false,
  editingPatentId: undefined,

  addPatents: addPatentsInitialState,
  packageDetails: packageDetailsInitialState,
  documents: documentsInitialState,

  package: undefined,
  patents: [],
  isPersistingPackage: false
};

export const setPackage = createSlice({
  name: 'setPackage',
  initialState,
  reducers: {
    resetSetPackageState: () => initialState,
    showAddPatentsModal: (state: SetPackageState) => {
      state.addPatents.isAddPatentsModalOpen = true;
    },
    hideAddPatentsModal: (state: SetPackageState) => {
      state.addPatents.isAddPatentsModalOpen = false;
    },

    // Edit Patent
    showEditPatentModal: (state: SetPackageState, action: PayloadAction<{ patentId: string }>) => {
      state.isEditPatentModalOpen = true;
      state.editingPatentId = action.payload.patentId;
    },
    hideEditPatentModal: (state: SetPackageState) => {
      state.isEditPatentModalOpen = false;
    },
    updateSelectedPatent: (state: SetPackageState, action: PayloadAction<{ patent: Patent }>) => {
      const { patent } = action.payload;
      state.patents = state.patents.filter(p => p.publicationNumber !== patent.publicationNumber);
      state.patents.push(patent);
    },
    deletePatent: (
      state: SetPackageState, action: PayloadAction<{ patentId: string }>
    ) => {
      const { patentId } = action.payload;
      state.patents = state.patents.filter(p => p.publicationNumber !== patentId);
    },

    // After finishing selecting patents from the table
    setPackagePatents: (state: SetPackageState, action: PayloadAction<Patent[] | undefined>) => {
      const { tableSelectedPatentIds } = state.addPatents.selectPatentsState;
      const patents = state.addPatents.fetchedPatents.filter(patent => tableSelectedPatentIds.includes(patent.publicationNumber));
      state.patents = mergeArrays(
        state.patents,
        [...patents, ...action?.payload ?? []],
        (patent: Patent) => patent.publicationNumber);
    },

    // set active package
    setActivePackage: (state: SetPackageState, action: PayloadAction<Package>) => {
      state.package = action.payload;
      state.packageDetails.packageDetailsForm = {
        ...action.payload,
        industryIds: action.payload.industryIds.map(iid => iid.toString()),
        keywords: action.payload.keywords.split(','),
        visibility: action.payload.visibility === 1 ? dropdownPublicOption.value : dropdownPrivateOption.value
      };
    },

    ...addPatentesReducer,
    ...packageDetailsReducer,
    ...documentsReducer
  },

  extraReducers: (builder) => {
    createSetPackageExtraReducers(builder);
    enterPatentsExtraReducers(builder);
    createDocumentsExtraReducers(builder);
  }
});


export const {
  resetSetPackageState,
  resetAddPatents,
  setActivePackage,
  showEditPatentModal,
  hideEditPatentModal,
  updateSelectedPatent,
  deletePatent,
  updatePatent,
  showAddPatentsModal,
  hideAddPatentsModal,

  // Enter Patents
  setAddPatentsStep,
  setAddPatentsActiveTab,
  updateEnterPatentsIdsManuallyForm,
  setImportPatentsFile,
  removeImportPatentsFile,

  setSelectedTablePatentIds,
  setPackagePatents,
  setPatents,
  setRowSelectionState,
  setPackageDetails,
  showSetContactModal,
  hideSetContactModal,
  setContact,
  setActiveContact,
  setContacts,
  showSetPatentModal,
  hideSetPatentModal,
  setEditingPatent,
  setEditedPatent,

  // Documents
  setDataroom,
  updateFileUploadState,
  addFileToUpload,
  removeQueuedFile
} = setPackage.actions;
export default setPackage.reducer;
