import { createAsyncThunk } from '@reduxjs/toolkit';
import { SerializedFile } from '@/redux/features/set-package/slices/documents';
import { createFileFromSerializedFile } from '@/utils/file';
import { uploadPackageDocumentFile } from '@/api/dataroom/upload-file';
import { RootState } from '@/redux/store';
import { updateFileUploadState } from '@/redux/features/set-package/set-package';

export const uploadPackageDocument = createAsyncThunk<
  void,
  SerializedFile,
  { state: RootState }
>(
  'package/documents/uploadFile',
  async (serializedFileUpload: SerializedFile, thunkAPI) => {
    const dataroomId =
      thunkAPI.getState().setPackageReducer.package?.dataroomId ?? '';
    try {
      const file = await createFileFromSerializedFile(serializedFileUpload);
      const res = await uploadPackageDocumentFile({
        file,
        folder: '',
        dataroomId,
        onProgress: progressCompleted => {
          if (thunkAPI.signal.aborted) {
            return;
          }
          thunkAPI.dispatch(updateFileUploadState({
            progress: progressCompleted,
            serializedFile: serializedFileUpload,
            requestId: thunkAPI.requestId
          }));
        }),
        abortSignal: thunkAPI.signal
      });
      console.log('File Upload Response: ', res);
    } catch (e) {
      console.error(e);
    }
  }
);
