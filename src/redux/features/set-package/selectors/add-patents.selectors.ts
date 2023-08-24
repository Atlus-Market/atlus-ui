import { createSelector } from 'reselect';
import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import {
  selectSetPackageState
} from '@/redux/features/set-package/selectors/set-package.selectors';
import {
  mapPatentsIdsToPatentIdsArray
} from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-ids/patent-id-validator';
import { AddPatentsState } from '@/redux/features/set-package/slices/add-patents/add-patents';


// Add patents

const selectAddPatentsState = createSelector(
  selectSetPackageState,
  (state): AddPatentsState => state.addPatents
);

const selectEnterPatentsState = createSelector(
  selectAddPatentsState,
  state => state.enterPatentsState
);

const selectSelectedPatentsState = createSelector(
  selectAddPatentsState,
  state => state.selectPatentsState
);

// Enter Patents State
export const selectAddPatentsActiveTab = createSelector(
  selectEnterPatentsState,
  (state): EnterPatentsNumberTab => state.activeTab
);

export const selectEnterPatentsIdsManuallyState = createSelector(
  selectEnterPatentsState,
  state => state[EnterPatentsNumberTab.EnterManually]
);

export const selectImportPatentsIdsFromFileState = createSelector(
  selectEnterPatentsState,
  state => state[EnterPatentsNumberTab.ImportFromFile]
);

// Common

export const selectIsActiveTabValid = createSelector(
  selectAddPatentsActiveTab,
  selectEnterPatentsIdsManuallyState,
  (activeTab, enterPatentsIdsManuallyState) => {
    if (activeTab === EnterPatentsNumberTab.EnterManually) {
      return enterPatentsIdsManuallyState.form.formState.isValid;
    }

    if (activeTab === EnterPatentsNumberTab.ImportFromFile) {
      return false;
    }

    return false;
  }
);

export const selectActivePatentsIds = createSelector(
  selectAddPatentsActiveTab,
  selectEnterPatentsIdsManuallyState,
  (activeTab, selectEnterPatentsIdsManuallyState): string[] => {
    if (activeTab == EnterPatentsNumberTab.EnterManually) {
      return mapPatentsIdsToPatentIdsArray(selectEnterPatentsIdsManuallyState.form?.formValues?.patentsIds);
    }
    // TODO: return import from file patents ids
    return [];
  }
);

export const selectFetchedPatents = createSelector(
  selectAddPatentsState,
  (state) => state.patents
);

// Select Patents State

export const selectTableSelectedPatentIds = createSelector(
  selectSelectedPatentsState,
  state => state.tableSelectedPatentIds
);

export const selectEditedPatentsIds = createSelector(
  selectSelectedPatentsState,
  state => state.editedPatentsIds
);

export const selectRowSelectionState = createSelector(
  selectSelectedPatentsState,
  state => state.rowSelectionState
);

export const selectIsSetPatentModalOpen = createSelector(
  selectSelectedPatentsState,
  state => state.isSetPatentModalOpen
);

export const selectEditingPatentInfo = createSelector(
  selectSelectedPatentsState,
  (selectPatentsState) => selectPatentsState.editingPatent
);

export const selectEditingPatent = createSelector(
  selectSelectedPatentsState,
  selectFetchedPatents,
  (selectPatentsState, patents) => {
    return patents.find(patent => patent.publicationNumber === selectPatentsState.editingPatent?.publicationNumber);
  }
);
