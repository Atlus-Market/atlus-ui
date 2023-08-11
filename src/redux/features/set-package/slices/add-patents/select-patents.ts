import { Patent } from '@/models/patent';
import { FamilyPatents, SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';

export interface SelectPatentsState {
  isSetPatentModalOpen: boolean;
  editingPublicationNumber: string | undefined;
  familyPatents: FamilyPatents;
}

export const selectPatentsInitialState: SelectPatentsState = {
  isSetPatentModalOpen: false,
  editingPublicationNumber: undefined,
  familyPatents: {}
};

export const selectPatentesReducer = {
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
  }
};
