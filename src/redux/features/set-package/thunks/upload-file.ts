import { createAsyncThunk } from '@reduxjs/toolkit';

export const uploadPackageFile = createAsyncThunk(
  'package/documents/uploadFile',
  async (userId, thunkAPI) => {
    try {
      await fetch('https://hub.dummyapis.com/delay?seconds=3600', {
        signal: thunkAPI.signal
      });
    } catch (e) {
      console.error(e);
      console.log('thunkAPI.signal: ', thunkAPI.signal);
    }

    return { result: 123 };
  }
);
