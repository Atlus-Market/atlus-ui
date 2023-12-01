'use client';

import { atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';
import { AtlusFormTextarea } from '@/components/ui/form/atlus-form-textarea';
import { useFormContext } from 'react-hook-form';
import { ShareBuyerForm } from '@/app/(main)/package/share/buyer/components/share-buyer-package-form';
import { ShareBuyerSearchContacts } from '@/app/(main)/package/share/buyer/components/share-buyer-search-contacts';

export const ShareBuyerPackageFormFields = () => {
  const { register } = useFormContext<ShareBuyerForm>();

  return (
    <div className={atlusModalBodyPaddingX}>
      <ShareBuyerSearchContacts />
      <AtlusFormTextarea placeholder="Write a message" {...register('message')} />
    </div>
  );
};
