import { Package } from '@/models/package';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { getInterestAreas } from '@/api/interest-areas/get-interest-areas';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';

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
      <AtlusTitle
        text="Industry"
        className="!text-[13px] md:!text-sm text-dark-grey mb-2 md:mb-[11px]"
      />
      <div className="flex gap-2 flex-wrap">
        {packageInterestAreas.map(area => (
          <AtlusTag key={area.id} text={area.name} />
        ))}
      </div>
    </div>
  );
};
