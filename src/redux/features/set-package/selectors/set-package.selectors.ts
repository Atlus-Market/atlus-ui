import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';
import { Patent } from '@/models/patent';

export const selectSetPackageState = (state: RootState) => state.setPackageReducer;

export const selectPatents = createSelector(
  selectSetPackageState,
  state => state.familyPatents
);

// Edit Patent

export const selectIsEditPatentModalOpen = createSelector(
  selectSetPackageState,
  state => state.isEditPatentModalOpen
);

export const selectPatentsListEditingPatent = createSelector(
  selectSetPackageState,
  state => {
    const patents = Object.values(state.familyPatents).flatMap((patents: Patent[]) => patents);
    return patents.find(patent => patent.publicationNumber === state.editingPatentId);
  }
);
