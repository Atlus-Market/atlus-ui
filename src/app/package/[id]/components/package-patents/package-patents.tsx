import { Package } from '@/models/package';
import { groupPatentsByFamily } from '@/utils/patents';
import { pluralize } from '@/utils/words';
import { PackagePatentsReducedTable } from '@/app/package/[id]/components/package-patents/components/package-patents-reduced-table';
import { PackageSectionTitle } from '@/app/package/[id]/components/package-section-title';
import { ViewPackagePatentsProvider } from '@/app/package/[id]/components/package-patents/components/view-package-patents/view-package-patents-provider';
import { ViewPackagePatentsModal } from '@/app/package/[id]/components/package-patents/components/view-package-patents/view-package-patents-modal';
import { SeeAllPatentsButton } from '@/app/package/[id]/components/package-patents/components/see-all-patents-button';

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
      <ViewPackagePatentsProvider>
        <PackagePatentsReducedTable familyPatents={familyPatents} />
        <SeeAllPatentsButton familyPatents={familyPatents} />
        <ViewPackagePatentsModal />
      </ViewPackagePatentsProvider>
    </div>
  );
};
