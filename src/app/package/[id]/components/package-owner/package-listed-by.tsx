import { PackageOwner } from '@/app/package/[id]/components/package-owner/package-owner';
import { PackageSectionTitle } from '@/app/package/[id]/components/package-section-title';
import { User } from '@/models/user';

interface PackageListedByProps {
  user: User;
}

export const PackageListedBy = ({ user }: PackageListedByProps) => {
  return (
    <div>
      <PackageSectionTitle title={`Listed by ${user.fullName}`} />
      <PackageOwner broker={user} />
    </div>
  );
};
