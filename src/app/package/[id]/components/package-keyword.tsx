import { Package } from '@/models/package';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';

interface PackageKeywordsProps {
  atlusPackage: Package;
}

export const PackageKeywords = ({ atlusPackage }: PackageKeywordsProps) => {
  return (
    <div>
      <AtlusTitle
        text="Keywords"
        className="!text-[13px] md:!text-sm text-dark-grey mb-2 md:mb-[11px]"
      />
      <div className="flex gap-2 flex-wrap">
        {atlusPackage.keywords.split(',').map((keyword, index) => (
          <AtlusTag key={`${index}-${keyword}`} text={keyword} />
        ))}
      </div>
    </div>
  );
};
