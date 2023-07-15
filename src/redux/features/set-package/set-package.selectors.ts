import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';
import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';

export const selectSetPackageState = createSelector(
  (state: RootState) => state.setPackageReducer,
  state => state
);
export const selectAddPatentsActiveTab = createSelector(
  selectSetPackageState,
  (state) => state.addPatents.activeTab
);

export const selectEnterPatentsIdsManuallyState = createSelector(
  selectSetPackageState,
  state => state.addPatents[EnterPatentsNumberTab.EnterManually]
);

export const selectImportPatentsIdsFromFileState = createSelector(
  selectSetPackageState,
  state => state.addPatents[EnterPatentsNumberTab.ImportFromFile]
);

export const selectIsActiveTabValid = createSelector(
  selectAddPatentsActiveTab,
  selectEnterPatentsIdsManuallyState,
  (activeTab, enterPatentsIdsManuallyState) => {
    if (activeTab === EnterPatentsNumberTab.EnterManually) {
      return enterPatentsIdsManuallyState.form.formState.isValid;
    }

    return false;
  }
);
