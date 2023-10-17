import { ReactNode } from 'react';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { ViewOwnerModal } from '@/app/package/[id]/components/package-owner/view-owner-modal';
import { User } from '@/models/user';

interface PackageOwnerProps {
  broker: User;
  footer?: ReactNode;
}

export const PackageOwner = ({ broker, footer }: PackageOwnerProps) => {
  return (
    <div className="flex items-center">
      <AtlusAvatar word={broker.fullName} size="big" />
      <div className="ml-[18px]">
        <span className="text-base md:text-lg text-black font-normal mb-1 md:mb-[2px] block leading-none">
          {broker.fullName}
        </span>
        <span className="text-sm text-dark-grey block leading-none mb-1 md:mb-[2px]">
          {broker.companyName}
        </span>
        <ViewOwnerModal user={broker} />
        {footer}
      </div>
    </div>
  );
};
