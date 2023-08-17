import { createAsyncThunk } from '@reduxjs/toolkit';
import { SerializedFileUpload } from '@/redux/features/set-package/slices/documents';
import { createFileFromSerializedFileUpload } from '@/utils/file';
import { uploadPackageDocumentFile } from '@/api/dataroom/upload-file';
import { RootState } from '@/redux/store';


// TODO: handle cancel
// TODO: dispatch rejected state
export const uploadPackageDocument = createAsyncThunk(
  'package/documents/uploadFile',
  async (serializedFileUpload: SerializedFileUpload, thunkAPI) => {
    const dataroomId = (thunkAPI.getState() as RootState).setPackageReducer.package?.dataroomId ?? '';
    try {
      const file = await createFileFromSerializedFileUpload(serializedFileUpload);
      const res = await uploadPackageDocumentFile({
        file,
        folder: '',
        dataroomId
      });
      console.log('File Upload Response: ', res);
      // await fetch('https://hub.dummyapis.com/delay?seconds=3600', {
      //   signal: thunkAPI.signal
      // });
    } catch (e) {
      console.error(e);
      console.log('thunkAPI.signal: ', thunkAPI.signal);
    }

    return { result: 123 };
  }
  // , {
  //   condition(arg: File, { getState }): boolean {
  //     console.log('getState: ', getState());
  //     return false;
  //   }
  // }
);
