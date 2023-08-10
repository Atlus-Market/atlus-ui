import { createSelector } from 'reselect';
import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import {
  selectSetPackageState
} from '@/redux/features/set-package/selectors/set-package.selectors';
import {
  mapPatentsIdsToPatentIdsArray
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-ids/patent-id-validator';


// Add patents

const selectAddPatentsState = createSelector(
  selectSetPackageState,
  state => state.addPatents
);

export const selectAddPatentsActiveTab = createSelector(
  selectAddPatentsState,
  (state) => state.activeTab
);

const selectEnterPatentsState = createSelector(
  selectAddPatentsState,
  state => state.enterPatents
);

const selectSelectPatentsState = createSelector(
  selectAddPatentsState,
  state => state.selectPatents
);


// Enter Patents State

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

export const selectSelectedFamilyPatents = createSelector(
  selectSelectPatentsState,
  state => state.familyPatents
);

export const selectNotFoundPatentsInAPI = createSelector(
  selectActivePatentsIds,
  selectFetchedPatents,
  (activePatentsIds, fetchedPatentsIds) => {
    // return activePatentsIds.filter(patentId => fetchedPatentsIds.find(patent => patent.applicationNumber !== patentId));
    return ['US99988877744'];
  }
);

export const selectIsSetPatentModalOpen = createSelector(
  selectSelectPatentsState,
  state => state.isSetPatentModalOpen
);

export const selectEditingPatent = createSelector(
  selectSelectPatentsState,
  selectFetchedPatents,
  (selectPatentsState, patents) => {
    return patents.find(patent => patent.publicationNumber === selectPatentsState.editingPublicationNumber);
  }
);
