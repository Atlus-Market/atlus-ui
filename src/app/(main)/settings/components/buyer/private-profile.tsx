'use client';

import { useFormContext } from 'react-hook-form';
import { BuyerSettings } from '@/app/(main)/settings/components/buyer/buyer-settings-form';
import { AtlusFormCheckbox } from '@/components/ui/form/atlus-form-checkbox';

export const PrivateProfile = () => {
  const { register, getValues } = useFormContext<BuyerSettings>();
  return (
    <div className="flex gap-4 mb-4 md:mb-6">
      <AtlusFormCheckbox {...register('privateProfile')} wrapperClassName="pt-[5px]" label="" />
      <div className="flex flex-col">
        <span className="text-sm md:text-[15px] font-inter mb-2">Make profile private</span>
        <span className="text-dark-grey text-xs font-inter">
          Remain hidden from search results on Atlus and only receive packages from brokers you
          know.
        </span>
      </div>
    </div>
  );
};
