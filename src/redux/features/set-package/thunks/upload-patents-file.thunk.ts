import { createAsyncThunk } from '@reduxjs/toolkit';
import { createFileFromSerializedFile } from '@/utils/file';
import { RootState } from '@/redux/store';
import { uploadPatentsFile as uploadPatentsFileRequest  } from '@/api/patents/upload-patents-file';
import {
  selectImportPatentsSerializedFile
} from '@/redux/features/set-package/selectors/add-patents.selectors';


export const uploadPatentsFile = createAsyncThunk(
  'package/enter-patents/upload-file',
  async (_, thunkAPI) => {
    const serializedFile = selectImportPatentsSerializedFile(thunkAPI.getState() as RootState);

    try {
      if (!serializedFile) {
        throw new Error('No patents file selected');
      }
      const file = await createFileFromSerializedFile(serializedFile);
      const res = await uploadPatentsFileRequest({
        file,
        abortSignal: thunkAPI.signal
      });
      console.log('Patents File Uploaded Response: ', res);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
