import { Package } from '@/models/package';
import { getInterestAreas } from '@/api/interest-areas/get-interest-areas';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { PackageSubSectionTitle } from '@/app/(main)/package/[id]/components/package-sub-section-title';

interface PackageIndustriesProps {
  atlusPackage: Package;
}

export const PackageIndustries = async ({ atlusPackage }: PackageIndustriesProps) => {
  const { interestArea } = await getInterestAreas();
  const packageInterestAreas = interestArea.filter(area =>
    atlusPackage.industryIds.includes(area.id)
  );

  return (
    <div>
      <PackageSubSectionTitle title="Industry" />
      <div className="flex gap-2 flex-wrap">
        {packageInterestAreas.map(area => (
          <AtlusTag key={area.id} text={area.name} />
        ))}
      </div>
    </div>
  );
};
