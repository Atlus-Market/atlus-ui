'use client';

import { useAppSelector } from '@/redux/hooks';
import { RecipientsList } from '@/app/package/share/broker/pages/find-recipients/components/common/recipients-list';
import {
  selectDirectories,
  selectDirectoriesSearchValue,
} from '@/redux/features/share-package/selectors/find-recipients/directories.selectors';
import {
  selectCustomRecipient,
  selectSelectedRecipientsId,
} from '@/redux/features/share-package/selectors/find-recipients.selectors';
import { addRecipient, removeRecipient } from '@/redux/features/share-package/share-package';
import {
  isCustomRecipient,
  Recipient,
} from '@/redux/features/share-package/slices/find-recipients/recipient';

const recipientsSubLines = (recipient: Recipient) => {
  if (isCustomRecipient(recipient)) {
    return [];
  }
  return [recipient.companyName];
};

export const DirectoriesList = () => {
  const directories = useAppSelector(selectDirectories);
  const selectedContactsId = useAppSelector(selectSelectedRecipientsId);
  const searchValue = useAppSelector(selectDirectoriesSearchValue);
  const customRecipient = useAppSelector(selectCustomRecipient);

  return (
    <RecipientsList
      selectedRecipientsIds={selectedContactsId}
      recipients={directories}
      customRecipient={customRecipient}
      selectRecipientAction={addRecipient}
      removeRecipientAction={removeRecipient}
      recipientSubLinesFn={recipientsSubLines}
      searchValue={searchValue}
    />
  );
};
