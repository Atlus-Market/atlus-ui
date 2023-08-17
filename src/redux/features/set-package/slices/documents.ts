import { Dataroom } from '@/models/dataroom';
import { SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';
import { uploadPackageDocument } from '@/redux/features/set-package/thunks/documents.thunks';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';


export interface SerializedFileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  objectUrl: string;
}

export interface UploadingFileState {
  serializedFile: SerializedFileUpload;
  requestId: string;
  progress: 0;
}

export interface DocumentsState {
  dataroom: Dataroom | undefined;
  uploadFilesQueue: SerializedFileUpload[];
  uploadingFiles: Record<string, UploadingFileState>;
}

export const documentsInitialState: DocumentsState = {
  dataroom: undefined,
  uploadFilesQueue: [],
  uploadingFiles: {}
};

export const documentsReducer = {
  setDataroom: (state: SetPackageState, action: PayloadAction<Dataroom>) => {
    state.documents.dataroom = action.payload;
  },

  // File Upload
  addFileToUpload: (state: SetPackageState, action: PayloadAction<SerializedFileUpload>) => {
    state.documents.uploadFilesQueue.push(action.payload);
  },
  updateFileUploadState: (state: SetPackageState, action: PayloadAction<UploadingFileState>) => {
    state.documents.uploadingFiles[action.payload.requestId] = action.payload;
  }
};

export const createDocumentsExtraReducers = (builder: ActionReducerMapBuilder<SetPackageState>) => {
  builder.addCase(uploadPackageDocument.pending, (state: SetPackageState, action) => {
    const { meta } = action;
    const payload = meta.arg;
    console.log('uploadPackageFile.pending:action ', action);
    state.documents.uploadFilesQueue = state.documents.uploadFilesQueue.filter(serializedFile => serializedFile.id !== payload.id);

    state.documents.uploadingFiles[meta.requestId] = {
      progress: 0,
      requestId: meta.requestId,
      serializedFile: payload
    };
  });

  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(uploadPackageDocument.fulfilled, (state: SetPackageState, action) => {
    console.log('uploadPackageFile.fulfilled:action ', action);
    const { meta } = action;
    // removeUploadingFileFromState(state, meta.arg, meta.requestId);
  });
  builder.addCase(uploadPackageDocument.rejected, (state: SetPackageState, action) => {
    console.log('uploadPackageFile.rejected:action ', action);
    const { meta } = action;
    // removeUploadingFileFromState(state, meta.arg, meta.requestId);
  });
};

const removeUploadingFileFromState = (state: SetPackageState, serializedFile: SerializedFileUpload, uploadId: string) => {
  delete state.documents.uploadingFiles[uploadId];
  window.URL.revokeObjectURL(serializedFile.objectUrl);
};
