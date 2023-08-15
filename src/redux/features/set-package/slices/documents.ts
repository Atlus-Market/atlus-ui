import { Dataroom } from '@/models/dataroom';
import { SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';
import { uploadPackageFile } from '@/redux/features/set-package/thunks/upload-file';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';

export interface DocumentsState {
  dataroom: Dataroom | undefined;
  uploadingFile: boolean;
}

export const documentsInitialState: DocumentsState = {
  dataroom: undefined,
  uploadingFile: false
};

export const documentsReducer = {
  setDataroom: (state: SetPackageState, action: PayloadAction<Dataroom>) => {
    state.documents.dataroom = action.payload;
  }
};


export const createDocumentsExtraReducers = (builder: ActionReducerMapBuilder<SetPackageState>) => {
  builder.addCase(uploadPackageFile.pending, (state: SetPackageState, action) => {
    // Add user to the state array
    state.documents.uploadingFile = true;
  });

  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(uploadPackageFile.fulfilled, (state: SetPackageState, action) => {
    // Add user to the state array
    state.documents.uploadingFile = false;
  });
};
