import { Dataroom, DirectoryTree } from '@/models/dataroom';
import { SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';
import { uploadPackageDocument } from '@/redux/features/set-package/thunks/upload-documents.thunks';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import { cleanSerializedFile } from '@/utils/file';


export interface SerializedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  objectUrl: string;
}

export interface UploadingFileState {
  serializedFile: SerializedFile;
  requestId: string;
  progress: number;
}

export interface DocumentsState {
  dataroom: Dataroom | undefined;
  uploadFilesQueue: SerializedFile[];
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
  addFileToUpload: (state: SetPackageState, action: PayloadAction<SerializedFile>) => {
    state.documents.uploadFilesQueue.push(action.payload);
  },
  updateFileUploadState: (state: SetPackageState, action: PayloadAction<UploadingFileState>) => {
    if (!state.documents.uploadingFiles[action.payload.requestId]) {
      return;
    }
    state.documents.uploadingFiles[action.payload.requestId] = action.payload;
  },
  removeQueuedFile: (state: SetPackageState, action: PayloadAction<{ fileId: string }>) => {
    const serializedFile = state.documents.uploadFilesQueue.find(file => file.id === action.payload.fileId);
    if (serializedFile) {
      cleanSerializedFile(serializedFile);
      state.documents.uploadFilesQueue = state.documents.uploadFilesQueue.filter(file => file.id !== action.payload.fileId);
    }
  },
  toggleDocumentVisibility: (state: SetPackageState, action: PayloadAction<{
    documentId: string
  }>) => {
    const dataroom = state.documents.dataroom;
    if (!dataroom) {
      return;
    }
    const directoryTree = getDirectoryTree(dataroom.directoryTree, action.payload.documentId);
    if (directoryTree) {
      directoryTree.private = !directoryTree.private;
    }
  },
  removeDocument: (state: SetPackageState, action: PayloadAction<{ documentId: string }>) => {
    if (!state.documents.dataroom) {
      return;
    }
    removeDirectoryTree(state.documents.dataroom.directoryTree, action.payload.documentId);
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
    removeUploadingFileFromState(state, meta.arg, meta.requestId);
  });
  builder.addCase(uploadPackageDocument.rejected, (state: SetPackageState, action) => {
    console.log('uploadPackageFile.rejected:action ', action);
    const { meta } = action;
    removeUploadingFileFromState(state, meta.arg, meta.requestId);
  });
};

const removeUploadingFileFromState = (state: SetPackageState, serializedFile: SerializedFile, uploadId: string) => {
  delete state.documents.uploadingFiles[uploadId];
  cleanSerializedFile(serializedFile);
};

const getDirectoryTree = (directoryTree: DirectoryTree, directoryTreeId: string): DirectoryTree | undefined => {
  if (directoryTree.id === directoryTreeId) {
    return directoryTree;
  }
  return directoryTree.children.find(childDirectoryTree => {
    if (childDirectoryTree.type === 'file') {
      return childDirectoryTree.id === directoryTreeId;
    }
    return getDirectoryTree(childDirectoryTree, directoryTreeId);
  });
};

const removeDirectoryTree = (directoryTree: DirectoryTree, directoryTreeId: string) => {
  directoryTree.children = directoryTree.children.filter(dt => dt.id !== directoryTreeId);
};
