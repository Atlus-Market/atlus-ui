import { PackageOwner } from '@/app/package/[id]/components/package-owner/package-owner';
import { PackageSectionTitle } from '@/app/package/[id]/components/package-section-title';
import { getUserByIdOnServer } from '@/api/user/get-user-by-id-on-server';

interface PackageListedByProps {
  brokerId: string;
}

export const PackageListedBy = async ({ brokerId }: PackageListedByProps) => {
  const user = await getUserByIdOnServer(brokerId);
  return (
    <div>
      <PackageSectionTitle title={`Listed by ${user.fullName}`} />
      <PackageOwner fullName={user.fullName} companyName={user.companyName} />
    </div>
  );
};
