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

export type FamilyPatents = {
  [familyId: string]: Patent[];
}

export interface SetPackageState {
  familyPatents: FamilyPatents;

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
  familyPatents: {},

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
      const familyPatents = state.familyPatents[patent.familyId] || [];
      const filteredPatents = familyPatents.filter(p => p.publicationNumber !== patent.publicationNumber);
      filteredPatents.push(patent);
      state.familyPatents[patent.familyId] = filteredPatents;
    },
    deletePatent: (
      state: SetPackageState, action: PayloadAction<{ patentId: string }>
    ) => {
      const { patentId } = action.payload;
      const familyId = Object.keys(state.familyPatents).find(familyId => state.familyPatents[familyId].find(patent => patent.publicationNumber === patentId));
      if (!familyId) {
        return state;
      }
      state.familyPatents[familyId] = state.familyPatents[familyId].filter(patent => patent.publicationNumber !== patentId);
      if (state.familyPatents[familyId].length === 0) {
        delete state.familyPatents[familyId];
      }
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
  selectPatents,
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
