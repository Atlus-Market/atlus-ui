import { Patent } from '@/models/patent';
import { FamilyPatents, SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';

export type PatentsRowSelectionState = Record<string, boolean>

export interface SelectPatentsState {
  isSetPatentModalOpen: boolean;
  editingPublicationNumber: string | undefined;
  selectedFamilyPatents: FamilyPatents;
  editedPatentsIds: string[]; // Patents IDs that were edited manually
  rowSelectionState: PatentsRowSelectionState;
}

export const selectPatentsInitialState: SelectPatentsState = {
  isSetPatentModalOpen: false,
  editingPublicationNumber: undefined,
  selectedFamilyPatents: {},
  editedPatentsIds: [],
  rowSelectionState: {}
};

export const selectPatentesReducer = {
  // Set Patents from the table
  selectPatents: (state: SetPackageState, action: PayloadAction<{ patents: Patent[] }>) => {
    const familyPatents: FamilyPatents = {};
    action.payload.patents.forEach(patent => {
      const currentPatents = familyPatents[patent.familyId] || [];
      familyPatents[patent.familyId] = [...currentPatents, patent];
    });
    state.addPatents.selectPatents.selectedFamilyPatents = familyPatents;
  },
  showSetPatentModal: (state: SetPackageState) => {
    state.addPatents.selectPatents.isSetPatentModalOpen = true;
  },
  hideSetPatentModal: (state: SetPackageState) => {
    state.addPatents.selectPatents.isSetPatentModalOpen = false;
  },
  setEditingPatent: (state: SetPackageState, action: PayloadAction<{
    publicationNumber: string
  }>) => {
    state.addPatents.selectPatents.editingPublicationNumber = action.payload.publicationNumber;
  },
  setEditedPatent: (state: SetPackageState, action: PayloadAction<{ patentId: string }>) => {
    if (state.addPatents.selectPatents.editedPatentsIds.includes(action.payload.patentId)) {
      return state;
    }
    state.addPatents.selectPatents.editedPatentsIds = [
      ...state.addPatents.selectPatents.editedPatentsIds,
      action.payload.patentId
    ];
  },
  setRowSelectionState: (
    state: SetPackageState,
    action: PayloadAction<{ rowSelectionState: PatentsRowSelectionState }>) => {
    state.addPatents.selectPatents.rowSelectionState = action.payload.rowSelectionState;
  }
};
