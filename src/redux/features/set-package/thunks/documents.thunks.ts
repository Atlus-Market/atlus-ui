import { createAsyncThunk } from '@reduxjs/toolkit';
import { SerializedFileUpload } from '@/redux/features/set-package/slices/documents';
import { createFileFromSerializedFileUpload } from '@/utils/file';
import { uploadPackageDocumentFile } from '@/api/dataroom/upload-file';
import { RootState } from '@/redux/store';
import { updateFileUploadState } from '@/redux/features/set-package/set-package';


export const uploadPackageDocument = createAsyncThunk(
  'package/documents/uploadFile',
  async (serializedFileUpload: SerializedFileUpload, thunkAPI) => {
    const dataroomId = (thunkAPI.getState() as RootState).setPackageReducer.package?.dataroomId ?? '';
    try {
      const file = await createFileFromSerializedFileUpload(serializedFileUpload);
      const res = await uploadPackageDocumentFile({
        file,
        folder: '',
        dataroomId,
        onProgress: (progressCompleted => {
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
