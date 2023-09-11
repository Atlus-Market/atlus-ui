import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

export const selectSetPackageState = (state: RootState) => state.setPackageReducer;

export const selectPackagePatents = createSelector(selectSetPackageState, state => state.patents);

// Edit Patent
export const selectIsEditPatentModalOpen = createSelector(
  selectSetPackageState,
  state => state.isEditPatentModalOpen
);

export const selectPatentsListEditingPatent = createSelector(selectSetPackageState, state => {
  const patents = state.patents;
  return patents.find(patent => patent.publicationNumber === state.editingPatentId);
});

export const selectIsPersistingPackage = createSelector(
  selectSetPackageState,
  state => state.isPersistingPackage
);

export const selectPackage = createSelector(selectSetPackageState, state => state.package);
