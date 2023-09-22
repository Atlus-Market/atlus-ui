import { Package } from '@/models/package';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { PackageSubSectionTitle } from '@/app/package/[id]/components/package-sub-section-title';

interface PackageKeywordsProps {
  atlusPackage: Package;
}

export const PackageKeywords = ({ atlusPackage }: PackageKeywordsProps) => {
  return (
    <div>
      <PackageSubSectionTitle title="Keywords" />
      <div className="flex gap-2 flex-wrap">
        {atlusPackage.keywords.split(',').map((keyword, index) => (
          <AtlusTag key={`${index}-${keyword}`} text={keyword} />
        ))}
      </div>
    </div>
  );
};
