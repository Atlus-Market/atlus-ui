import { Package } from '@/models/package';
import { groupPatentsByFamily } from '@/utils/patents';
import { pluralize } from '@/utils/words';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { PackagePatentsTable } from '@/app/package/[id]/components/package-patents/components/package-patents-table';
import { PackageDivider } from '@/app/package/[id]/components/package-divider';
import { PackagePatentsTableCompact } from '@/app/package/[id]/components/package-patents/components/package-patents-table-compact';

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
      <AtlusTitle text={familyTitle} className="!font-normal !text-base md:!text-xl text-black" />
      <PackagePatentsTableCompact patents={allPatents} />
      <PackageDivider />
      {/*<PackagePatentsTable patents={allPatents} type="full" />*/}
    </div>
  );
};
