'use client';

import { atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';
import { AtlusFormTextarea } from '@/components/ui/form/atlus-form-textarea';
import { useFormContext, useWatch } from 'react-hook-form';
import { ShareBuyerForm } from '@/app/package/share/buyer/components/share-buyer-package-form';
import { ShareBuyerSearchContacts } from '@/app/package/share/buyer/components/share-buyer-search-contacts';

export const ShareBuyerPackageFormFields = () => {
  const { register } = useFormContext<ShareBuyerForm>();
  const message = useWatch({ name: 'message' });
  const emails = useWatch({ name: 'emails' });
  console.log(message);
  console.log(emails);

  return (
    <div className={atlusModalBodyPaddingX}>
      <ShareBuyerSearchContacts />
      <AtlusFormTextarea placeholder="Write a message" {...register('message')} />
    </div>
  );
};
