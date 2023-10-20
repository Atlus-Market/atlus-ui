import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Patent } from '@/models/patent';
import {
  packageDetailsInitialState,
  packageDetailsReducer,
  PackageDetailsState,
  packageTitleValidatorExtraReducers,
} from '@/redux/features/set-package/slices/package-details';
import {
  addPatentesReducer,
  addPatentsInitialState,
  AddPatentsState,
} from '@/redux/features/set-package/slices/add-patents/add-patents';
import { Package } from '@/models/package';
import {
  createDocumentsExtraReducers,
  documentsInitialState,
  documentsReducer,
  DocumentsState,
} from '@/redux/features/set-package/slices/documents';
import { createSetPackageExtraReducers } from '@/redux/features/set-package/set-package-extra-reducers';
import { getPatentId, mergeArrays } from '@/utils/patents';
import { cleanSerializedFile } from '@/utils/file';

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
  isPersistingPackage: false,
};

export const setPackage = createSlice({
  name: 'setPackage',
  initialState,
  reducers: {
    resetSetPackageState: (state: SetPackageState) => {
      state.documents.uploadFilesQueue.forEach(serializedFile => {
        cleanSerializedFile(serializedFile);
      });
      return initialState;
    },
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
      state.patents = state.patents.filter(p => getPatentId(p) !== getPatentId(patent));
      state.patents.push(patent);
    },
    removePatent: (state: SetPackageState, action: PayloadAction<{ patentId: string }>) => {
      const { patentId } = action.payload;
      state.patents = state.patents.filter(p => getPatentId(p) !== patentId);
    },
    removeFamilyPatents: (state: SetPackageState, action: PayloadAction<{ familyId: string }>) => {
      const { familyId } = action.payload;
      state.patents = state.patents.filter(patent => patent.familyId !== familyId);
    },

    // After finishing selecting patents from the table
    setPackagePatents: (state: SetPackageState, action: PayloadAction<Patent[] | undefined>) => {
      const { tableSelectedPatentIds } = state.addPatents.selectPatentsState;
      const patents = state.addPatents.fetchedPatents.filter(patent =>
        tableSelectedPatentIds.includes(getPatentId(patent))
      );
      state.patents = mergeArrays(
        state.patents,
        [...patents, ...(action?.payload ?? [])],
        (patent: Patent) => getPatentId(patent)
      );
    },

    // set active package
    setActivePackage: (state: SetPackageState, action: PayloadAction<Package>) => {
      state.package = action.payload;
      state.patents = [...action.payload.patents, ...action.payload.customPatents];
      state.packageDetails.packageDetailsForm = {
        ...action.payload,
        keywords: action.payload.keywords.split(','),
        products: (action.payload.products ?? '').split(',').filter(p => p.length > 0),
      };
    },

    ...addPatentesReducer,
    ...packageDetailsReducer,
    ...documentsReducer,
  },

  extraReducers: builder => {
    createSetPackageExtraReducers(builder);
    createDocumentsExtraReducers(builder);
    packageTitleValidatorExtraReducers(builder);
  },
});

export const {
  resetSetPackageState,
  resetAddPatents,
  setActivePackage,
  showEditPatentModal,
  hideEditPatentModal,
  updateSelectedPatent,
  removePatent,
  updatePatent,
  removeFamilyPatents,
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
  removeQueuedFile,
  toggleDocumentVisibility,
  removeDocument,
} = setPackage.actions;
export default setPackage.reducer;
