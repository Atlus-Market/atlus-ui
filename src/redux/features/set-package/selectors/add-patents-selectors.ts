import { createSelector } from 'reselect';
import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import {
  selectSetPackageState
} from '@/redux/features/set-package/selectors/set-package.selectors';


// Add patents

export const selectAddPatentsActiveTab = createSelector(
  selectSetPackageState,
  (state) => state.addPatents.activeTab
);

const selectEnterPatentsState = createSelector(
  selectSetPackageState,
  state => state.addPatents.enterPatents
);

const selectSelectPatentsState = createSelector(
  selectSetPackageState,
  state => state.addPatents.selectPatents
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
      return selectEnterPatentsIdsManuallyState.form?.formValues?.patentsIds?.split(',') || [];
    }
    // TODO: return import from file patents ids
    return [];
  }
);

export const selectFetchedPatents = createSelector(
  selectSetPackageState,
  (state) => state.addPatents.patents
);

// Select Patents State

export const selectSelectedFamilyPatents = createSelector(
  selectSelectPatentsState,
  state => state.familyPatents
);
