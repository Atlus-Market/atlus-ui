import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import { SetPackageState } from '@/redux/features/set-package/set-package';

import {
  EnterPatentsNumberTab
} from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import { uploadPatentsFile } from '@/redux/features/set-package/thunks/upload-patents-file.thunk';

export const enterPatentsExtraReducers = (builder: ActionReducerMapBuilder<SetPackageState>) => {
  builder.addCase(uploadPatentsFile.pending, (state: SetPackageState, action) => {
    state.addPatents.enterPatentsState[EnterPatentsNumberTab.ImportFromFile].uploadingFile = true;
  });

  builder.addCase(uploadPatentsFile.fulfilled, (state: SetPackageState, action) => {
    state.addPatents.enterPatentsState[EnterPatentsNumberTab.ImportFromFile].uploadingFile = false;
  });

  builder.addCase(uploadPatentsFile.rejected, (state: SetPackageState, action) => {
    state.addPatents.enterPatentsState[EnterPatentsNumberTab.ImportFromFile].uploadingFile = false;
  });
};
