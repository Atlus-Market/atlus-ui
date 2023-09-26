import { OwnerProfilePicture } from '@/app/package/[id]/components/package-owner/owner-profile-picture';
import { ReactNode } from 'react';

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
      <OwnerProfilePicture pictureUrl={broker.profilePictureUrl} />
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
