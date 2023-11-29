import { UserInfo } from '@/components/common/user-info/user-info';
import { PackageSectionTitle } from '@/app/package/[id]/components/package-section-title';
import { User } from '@/models/user';
import { ViewOwnerModal } from '@/app/package/[id]/components/package-owner/view-owner-modal';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { UserInfoFullName } from '@/components/common/user-info/user-info-full-name';
import { UserInfoCompanyName } from '@/components/common/user-info/user-info-company-name';

interface PackageListedByProps {
  user: User;
}

export const PackageListedBy = ({ user }: PackageListedByProps) => {
  return (
    <div>
      <PackageSectionTitle title={`Listed by ${user.fullName}`} />
      <UserInfo
        avatar={<AtlusAvatar data={user} className="w-64 md:w-72" />}
        fullName={<UserInfoFullName fullName={user.fullName} />}
        companyName={<UserInfoCompanyName companyName={user.companyName} />}
        footer={<ViewOwnerModal user={user} />}
      />
    </div>
  );
};
