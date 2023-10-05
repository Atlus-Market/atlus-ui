'use client';

import { useAppSelector } from '@/redux/hooks';
import { Recipient, RecipientsList } from '@/app/package/share/broker/components/recipients-list';
import {
  removeSelectedDirectory,
  selectDirectory,
} from '@/redux/features/share-package/share-package';
import {
  selectDirectories,
  selectSelectedDirectoriesIds,
} from '@/redux/features/share-package/selectors/find-recipients/directories.selectors';

export const DirectoriesList = () => {
  const directories = useAppSelector(selectDirectories);
  const selectedContactsId = useAppSelector(selectSelectedDirectoriesIds);

  return (
    <RecipientsList
      selectedRecipientsIds={selectedContactsId}
      recipients={directories}
      selectRecipientAction={selectDirectory}
      removeRecipientAction={removeSelectedDirectory}
      recipientSubLinesFn={(recipient: Recipient) => [recipient.companyName]}
    />
  );
};
