import { ReactNode } from 'react';

interface PackageOwnerProps {
  avatar: ReactNode;
  fullName: ReactNode;
  companyName: ReactNode;
  footer?: ReactNode;
}

export const UserInfo = ({ avatar, fullName, companyName, footer }: PackageOwnerProps) => {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      {avatar}
      <div>
        {fullName}
        {companyName}
        {footer}
      </div>
    </div>
  );
};
