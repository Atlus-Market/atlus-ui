import { Package } from '@/models/package';
import { pluralize } from '@/utils/words';
import { AtlusCircle } from '@/components/ui/atlus-circle';
import clsx from 'clsx';

interface PackageFamiliesAndDocumentsProps {
  atlusPackage: Package;
  className?: string;
}

const textClassName = 'text-black text-xs md:text-sm !leading-5 md:!leading-17 font-inter';

export const PackageFamiliesAndDocuments = ({
  atlusPackage,
  className,
}: PackageFamiliesAndDocumentsProps) => {
  const familiesCount = atlusPackage.numberOfFamilies;
  const documentsCount = atlusPackage.numberOfDocuments;
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <span className={textClassName}>
        3{familiesCount} {pluralize('family', familiesCount)}
      </span>
      <AtlusCircle className="bg-light-grey" width={4} height={4} />
      <span className={textClassName}>
        5{documentsCount} {pluralize('document', documentsCount)}
      </span>
    </div>
  );
};
