import { Package } from '@/models/package';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { PackageSubSectionTitle } from '@/app/package/[id]/components/package-sub-section-title';
import { SepStandard } from '@/models/sep-standard';

interface PackageProductsProps {
  atlusPackage: Package;
  sepStandards: SepStandard[];
}

export const PackageStandards = ({ atlusPackage, sepStandards }: PackageProductsProps) => {
  if (!atlusPackage.containsSep) {
    return null;
  }

  const standardsMap = new Map<number, string>();
  for (const sepStandard of sepStandards) {
    standardsMap.set(sepStandard.id, sepStandard.name);
  }

  return (
    <div>
      <PackageSubSectionTitle title="Standards" />
      <div className="flex gap-2 flex-wrap">
        {atlusPackage.sepStandardIds.map((sepStandardId, index) => (
          <AtlusTag key={`${index}-${sepStandardId}`} text={standardsMap.get(sepStandardId)} />
        ))}
      </div>
    </div>
  );
};
