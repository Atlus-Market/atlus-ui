import { OwnerProfilePicture } from '@/app/package/[id]/components/package-owner/owner-profile-picture';
import { ReactNode } from 'react';

interface PackageOwnerProps {
  profilePictureUrl?: string;
  fullName: string;
  companyName: string;
  footer?: ReactNode;
}

export const PackageOwner = ({
  fullName,
  companyName,
  profilePictureUrl,
  footer,
}: PackageOwnerProps) => {
  return (
    <div className="flex items-center">
      <OwnerProfilePicture pictureUrl={profilePictureUrl} />
      <div className="ml-[18px]">
        <span className="text-base md:text-lg text-black font-normal mb-1 md:mb-[2px] block leading-none">
          {fullName}
        </span>
        <span className="text-sm text-dark-grey block leading-none">{companyName}</span>
        {footer}
      </div>
    </div>
  );
};
