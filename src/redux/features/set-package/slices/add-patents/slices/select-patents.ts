import { SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';

export type PatentsRowSelectionState = Record<string, boolean>;

export interface EditingPatent {
  publicationNumber: string;
  rowId: string;
}

export interface SelectPatentsState {
  isSetPatentModalOpen: boolean;
  editingPatent: EditingPatent | undefined;
  tableSelectedPatentIds: string[];
  editedPatentsIds: string[]; // Patents IDs that were edited manually
  rowSelectionState: PatentsRowSelectionState;
}

export const selectPatentsInitialState: SelectPatentsState = {
  isSetPatentModalOpen: false,
  editingPatent: undefined,
  tableSelectedPatentIds: [],
  editedPatentsIds: [],
  rowSelectionState: {},
};

export const selectPatentesReducer = {
  // Set Patents from the table
  setSelectedTablePatentIds: (
    state: SetPackageState,
    action: PayloadAction<{ patentIds: string[] }>
  ) => {
    state.addPatents.selectPatentsState.tableSelectedPatentIds = action.payload.patentIds;
  },
  showSetPatentModal: (state: SetPackageState) => {
    state.addPatents.selectPatentsState.isSetPatentModalOpen = true;
  },
  hideSetPatentModal: (state: SetPackageState) => {
    state.addPatents.selectPatentsState.isSetPatentModalOpen = false;
  },
  setEditingPatent: (state: SetPackageState, action: PayloadAction<EditingPatent>) => {
    state.addPatents.selectPatentsState.editingPatent = action.payload;
  },
  setEditedPatent: (state: SetPackageState, action: PayloadAction<{ patentId: string }>) => {
    if (state.addPatents.selectPatentsState.editedPatentsIds.includes(action.payload.patentId)) {
      return state;
    }
    state.addPatents.selectPatentsState.editedPatentsIds = [
      ...state.addPatents.selectPatentsState.editedPatentsIds,
      action.payload.patentId,
    ];
  },
  setRowSelectionState: (
    state: SetPackageState,
    action: PayloadAction<{ rowSelectionState: PatentsRowSelectionState }>
  ) => {
    state.addPatents.selectPatentsState.rowSelectionState = action.payload.rowSelectionState;
  },
};
