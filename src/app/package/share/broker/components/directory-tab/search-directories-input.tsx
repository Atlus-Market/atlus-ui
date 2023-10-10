'use client';

import { useAppSelector } from '@/redux/hooks';
import { SearchRecipientsInput } from '@/app/package/share/broker/components/commom/search-recipients-input';
import {
  selectDirectoriesSearchValue,
  selectIsSearchingDirectories,
} from '@/redux/features/share-package/selectors/find-recipients/directories.selectors';
import { searchDirectories } from '@/redux/features/share-package/thunks/search-directories.thunk';
import { selectSelectedRecipients } from '@/redux/features/share-package/selectors/find-recipients.selectors';
import { removeRecipient } from '@/redux/features/share-package/share-package';

export const SearchDirectoriesInput = () => {
  const selectedDirectories = useAppSelector(selectSelectedRecipients);
  const isSearchingDirectories = useAppSelector(selectIsSearchingDirectories);
  const searchValue = useAppSelector(selectDirectoriesSearchValue);

  return (
    <SearchRecipientsInput
      placeholder="Search name or company"
      isSearching={isSearchingDirectories}
      recipients={selectedDirectories}
      removeRecipientAction={removeRecipient}
      searchRecipientAction={searchDirectories}
      searchValue={searchValue}
    />
  );
};
