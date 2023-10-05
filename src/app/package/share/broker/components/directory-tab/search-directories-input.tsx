'use client';

import { useAppSelector } from '@/redux/hooks';
import { SearchRecipientsInput } from '@/app/package/share/commom/search-recipients-input';
import { removeSelectedDirectory } from '@/redux/features/share-package/share-package';
import {
  selectIsSearchingDirectories,
  selectSelectedDirectories,
} from '@/redux/features/share-package/selectors/find-recipients/directories.selectors';
import { searchDirectories } from '@/redux/features/share-package/thunks/search-directories.thunk';

export const SearchDirectoriesInput = () => {
  const selectedDirectories = useAppSelector(selectSelectedDirectories);
  const isSearchingDirectories = useAppSelector(selectIsSearchingDirectories);

  return (
    <SearchRecipientsInput
      placeholder="Search name or company"
      isSearching={isSearchingDirectories}
      recipients={selectedDirectories}
      removeRecipientAction={removeSelectedDirectory}
      searchRecipientAction={searchDirectories}
    />
  );
};
