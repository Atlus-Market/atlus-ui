import { createAsyncThunk } from '@reduxjs/toolkit';

export const uploadPackageFile = createAsyncThunk(
  'package/documents/uploadFile',
  async (userId, thunkAPI) => {
    await fetch('https://hub.dummyapis.com/delay?seconds=3600', {
      signal: thunkAPI.signal
    });
    return { result: 123 };
  }
);
