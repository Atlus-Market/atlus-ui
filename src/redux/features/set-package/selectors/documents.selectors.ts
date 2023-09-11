import { createSelector } from 'reselect';
import { selectSetPackageState } from '@/redux/features/set-package/selectors/set-package.selectors';

export const selectDocumentsState = createSelector(selectSetPackageState, state => state.documents);

export const selectActiveDataroom = createSelector(
  selectSetPackageState,
  state => state.package?.dataroomId
);

export const selectDataroom = createSelector(selectDocumentsState, state => state.dataroom);

const MAX_CONCURRENT_UPLOADS = 2;

export const selectDocumentsToUpload = createSelector(selectDocumentsState, state => {
  const { uploadFilesQueue, uploadingFiles } = state;
  const uploadingFilesCount = Object.keys(uploadingFiles).length;

  if (uploadingFilesCount < MAX_CONCURRENT_UPLOADS) {
    const availableUploadsCount = MAX_CONCURRENT_UPLOADS - uploadingFilesCount;
    return uploadFilesQueue.slice(0, availableUploadsCount);
  }

  return [];
});

export const selectUploadingFiles = createSelector(selectDocumentsState, state =>
  Object.values(state.uploadingFiles)
);

export const selectUploadFilesQueue = createSelector(
  selectDocumentsState,
  state => state.uploadFilesQueue
);

export const selectPackageDataroom = createSelector(selectDocumentsState, state => state.dataroom);
