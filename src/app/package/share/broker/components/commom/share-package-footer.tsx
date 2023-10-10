'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiLink } from 'react-icons/hi2';
import { AtlusCopyToClipboard } from '@/components/common/atlus-copy-to-clipboard';
import { ReactNode } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectSharePackageId } from '@/redux/features/share-package/selectors/share-package.selectors';
import { PackagePageUrl } from '@/constants/routes';

interface SharePackageFooterProps {
  children: ReactNode;
}

export const SharePackageFooter = ({ children }: SharePackageFooterProps) => {
  const packageId = useAppSelector(selectSharePackageId);
  const packageUrl = `${window.location.origin}/${PackagePageUrl(packageId)}`;
  return (
    <div className="flex justify-between items-center w-full">
      <AtlusCopyToClipboard textToCopy={packageUrl} onCopiedText="Link copied!">
        <AtlusButton variant="clear">
          <HiLink size={20} className="mr-[10px]" /> Copy Link
        </AtlusButton>
      </AtlusCopyToClipboard>
      {children}
    </div>
  );
};
