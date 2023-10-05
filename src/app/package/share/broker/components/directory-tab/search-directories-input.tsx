'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { SearchRecipientsInput } from '@/app/package/share/commom/search-recipients-input';
import { removeSelectedDirectory } from '@/redux/features/share-package/share-package';
import {
  selectIsSearchingDirectories,
  selectSelectedDirectories,
} from '@/redux/features/share-package/selectors/find-recipients/directories.selectors';
import { searchDirectories } from '@/redux/features/share-package/thunks/search-directories.thunk';

export const SearchDirectoriesInput = () => {
  const dispatch = useAppDispatch();
  const selectedDirectories = useAppSelector(selectSelectedDirectories);
  const isSearchingDirectories = useAppSelector(selectIsSearchingDirectories);
  const activeThunk = useRef<any | null>();

  useEffect(() => {
    // @ts-ignore
    activeThunk.current = dispatch(searchDirectories(''));
  }, [dispatch]);

  const removeDirectory = useCallback(
    (directoryId: string) => {
      dispatch(removeSelectedDirectory({ id: directoryId }));
    },
    [dispatch]
  );

  const onSearchInputChange = useCallback(
    (searchValue: string) => {
      activeThunk.current?.abort?.();
      // @ts-ignore
      activeThunk.current = dispatch(searchDirectories(searchValue));
    },
    [dispatch]
  );

  return (
    <SearchRecipientsInput
      placeholder="Search name or company"
      isSearching={isSearchingDirectories}
      recipients={selectedDirectories}
      onRemoveRecipient={removeDirectory}
      onSearchInputChange={onSearchInputChange}
    />
  );
};
