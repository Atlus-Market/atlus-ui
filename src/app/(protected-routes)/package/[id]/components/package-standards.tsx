import { Package } from '@/models/package';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { PackageSubSectionTitle } from '@/app/(protected-routes)/package/[id]/components/package-sub-section-title';

interface PackageProductsProps {
  atlusPackage: Package;
}

export const PackageStandards = ({ atlusPackage }: PackageProductsProps) => {
  if (!atlusPackage.containsSep) {
    return null;
  }

  return (
    <div>
      <PackageSubSectionTitle title="Standards" />
      <div className="flex gap-2 flex-wrap">
        {atlusPackage.sepStandardIds.map((keyword, index) => (
          <AtlusTag key={`${index}-${keyword}`} text={keyword} />
        ))}
      </div>
    </div>
  );
};
