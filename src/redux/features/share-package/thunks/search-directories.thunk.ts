import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { searchUsers, SearchUsersResponse } from '@/api/user/search-users';

export const searchDirectories = createAsyncThunk<
  SearchUsersResponse | undefined,
  string,
  {
    state: RootState;
  }
>('sharePackage/directories/search', async (searchValue: string, thunkAPI) => {
  try {
    const { signal } = thunkAPI;
    return await searchUsers({ searchString: searchValue }, signal);
  } catch (e) {
    console.error(e);
    return undefined;
  }
});
