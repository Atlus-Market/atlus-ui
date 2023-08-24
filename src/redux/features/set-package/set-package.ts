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


export interface SetPackageState {
  patents: Patent[];

  // Edit Patent
  isEditPatentModalOpen: boolean;
  editingPatentId: string | undefined;

  addPatents: AddPatentsState;
  packageDetails: PackageDetailsState;
  documents: DocumentsState;

  package: Package | undefined;

  isPersistingPackage: boolean;
}

const initialState: SetPackageState = {
  patents: [],

  // Edit Patent
  isEditPatentModalOpen: false,
  editingPatentId: undefined,

  addPatents: addPatentsInitialState,
  packageDetails: packageDetailsInitialState,
  documents: documentsInitialState,

  package: undefined,
  isPersistingPackage: false
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
    setPackagePatents: (state: SetPackageState, action: PayloadAction<Patent[]>) => {
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
    },

    ...addPatentesReducer,
    ...packageDetailsReducer,
    ...documentsReducer
  },

  extraReducers: (builder) => {
    createSetPackageExtraReducers(builder);
    createDocumentsExtraReducers(builder);
  }
});


export const {
  reset,
  resetAddPatents,
  setActivePackage,
  showEditPatentModal,
  hideEditPatentModal,
  updateSelectedPatent,
  deletePatent,
  updatePatent,
  showAddPatentsModal,
  hideAddPatentsModal,
  setAddPatentsStep,
  setAddPatentsActiveTab,
  updateEnterPatentsIdsManuallyForm,
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
  addFileToUpload
} = setPackage.actions;
export default setPackage.reducer;
