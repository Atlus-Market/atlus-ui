'use client';

import { AtlusFormTextarea } from '@/components/ui/form/atlus-form-textarea';
import { useFormContext } from 'react-hook-form';
import { ShareBuyerForm } from '@/app/(main)/package/share/buyer/components/share-buyer-package-form';
import { ShareBuyerSearchContacts } from '@/app/(main)/package/share/buyer/components/share-buyer-search-contacts';
import { atlusMediumModalBodyPx } from '@/components/ui/modal/atlus-modal-body';

export const ShareBuyerPackageFormFields = () => {
  const { register } = useFormContext<ShareBuyerForm>();

  return (
    <div className={atlusMediumModalBodyPx}>
      <ShareBuyerSearchContacts />
      <AtlusFormTextarea placeholder="Write a message" {...register('message')} />
    </div>
  );
};
