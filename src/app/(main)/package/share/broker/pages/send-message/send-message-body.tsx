'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectSelectedRecipients } from '@/redux/features/share-package/selectors/find-recipients.selectors';
import { useCallback } from 'react';
import { removeRecipient } from '@/redux/features/share-package/share-package';
import clsx from 'clsx';
import { atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';
import { SendMessageFormFields } from '@/app/(main)/package/share/broker/pages/send-message/send-message-form-fields';

export const SendMessageBody = () => {
  const recipients = useAppSelector(selectSelectedRecipients);
  const dispatch = useAppDispatch();

  const onRemoveRecipient = useCallback(
    (recipientId: string) => {
      dispatch(removeRecipient({ id: recipientId }));
    },
    [dispatch]
  );

  return (
    <div className={clsx(atlusModalBodyPaddingX)}>
      {/*<div className="border-light-grey border rounded-lg min-h-[53px] px-4 py-[6px] flex gap-2 flex-wrap mb-5">*/}
      {/*  <RecipientsTagsList recipients={recipients} onRemoveRecipient={onRemoveRecipient} />*/}
      {/*</div>*/}
      <SendMessageFormFields recipients={recipients} onRemoveRecipient={onRemoveRecipient} />
    </div>
  );
};
