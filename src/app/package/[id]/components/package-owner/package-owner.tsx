import { ReactNode } from 'react';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';

export interface BrokerAvatarInfo {
  profilePictureUrl?: string;
  fullName: string;
  companyName: string;
}

interface PackageOwnerProps {
  broker: BrokerAvatarInfo;
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
        <span className="text-sm text-dark-grey block leading-none">{broker.companyName}</span>
        {footer}
      </div>
    </div>
  );
};
