import { Package } from '@/models/package';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { PackageSubSectionTitle } from '@/app/package/[id]/components/package-sub-section-title';

interface PackageProductsProps {
  atlusPackage: Package;
}

export const PackageProducts = ({ atlusPackage }: PackageProductsProps) => {
  return (
    <div>
      <PackageSubSectionTitle title="Products" />
      <div className="flex gap-2 flex-wrap">
        {atlusPackage.products.map((keyword, index) => (
          <AtlusTag key={`${index}-${keyword}`} text={keyword} />
        ))}
      </div>
    </div>
  );
};
