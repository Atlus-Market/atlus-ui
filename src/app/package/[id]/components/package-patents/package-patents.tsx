import { Package } from '@/models/package';
import { groupPatentsByFamily } from '@/utils/patents';
import { pluralize } from '@/utils/words';
import { PackageDivider } from '@/app/package/[id]/components/package-divider';
import { PackagePatentsTableCompact } from '@/app/package/[id]/components/package-patents/components/package-patents-table-compact';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { PackageSectionTitle } from '@/app/package/[id]/components/package-section-title';

interface PackagePatentsTableProps {
  atlusPackage: Package;
}

export const PackagePatents = ({ atlusPackage }: PackagePatentsTableProps) => {
  const allPatents = [...atlusPackage.patents, ...atlusPackage.customPatents];
  const familyPatents = groupPatentsByFamily(allPatents);
  const familiesCount = Object.keys(familyPatents).length;
  const familyTitle = `${familiesCount} ${pluralize('family', familiesCount)}`;
  return (
    <div>
      <PackageSectionTitle title={familyTitle} />
      <PackagePatentsTableCompact patents={allPatents} />
      <AtlusButton variant="outline" className="mt-4 md:mt-6">
        See all patents
      </AtlusButton>
      <PackageDivider />
    </div>
  );
};
