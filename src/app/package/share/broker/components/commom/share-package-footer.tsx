'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiLink } from 'react-icons/hi2';
import { setActivePage } from '@/redux/features/share-package/share-package';
import { useAppDispatch } from '@/redux/hooks';
import { SharePackagePage } from '@/app/package/share/broker/components/commom/share-package-page';

export const SharePackageFooter = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between items-center w-full">
      <AtlusButton variant="clear">
        <HiLink size={20} className="mr-[10px]" /> Copy Link
      </AtlusButton>
      <AtlusButton
        variant="solid"
        onClick={() => dispatch(setActivePage(SharePackagePage.SendMessage))}
      >
        Next
      </AtlusButton>
    </div>
  );
};
