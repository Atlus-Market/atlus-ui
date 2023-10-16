'use client';

import { useAppSelector } from '@/redux/hooks';
import { SearchRecipientsInput } from '@/app/package/share/broker/pages/find-recipients/components/common/search-recipients-input';
import { selectIsSearchingDirectories } from '@/redux/features/share-package/selectors/find-recipients/directories.selectors';
import { searchDirectories } from '@/redux/features/share-package/thunks/search-directories.thunk';
import { selectSelectedRecipients } from '@/redux/features/share-package/selectors/find-recipients.selectors';
import {
  removeRecipient,
  resetDirectoriesSearch,
} from '@/redux/features/share-package/share-package';

export const SearchDirectoriesInput = () => {
  const selectedDirectories = useAppSelector(selectSelectedRecipients);
  const isSearchingDirectories = useAppSelector(selectIsSearchingDirectories);

  return (
    <SearchRecipientsInput
      placeholder="Search name or company"
      isSearching={isSearchingDirectories}
      recipients={selectedDirectories}
      removeRecipientAction={removeRecipient}
      searchRecipientAction={searchDirectories}
      resetSearchAction={resetDirectoriesSearch}
    />
  );
};
