import { createAsyncThunk } from '@reduxjs/toolkit';
import { SerializedFileUpload } from '@/redux/features/set-package/slices/documents';
import { createFileFromSerializedFileUpload } from '@/utils/file';

export const uploadPackageDocument = createAsyncThunk(
  'package/documents/uploadFile',
  async (serializedFileUpload: SerializedFileUpload, thunkAPI) => {
    try {
      const file = await createFileFromSerializedFileUpload(serializedFileUpload);
      await fetch('https://hub.dummyapis.com/delay?seconds=3600', {
        signal: thunkAPI.signal
      });
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
