import { pluralize } from '@/utils/words';
import { AtlusCircle } from '@/components/ui/atlus-circle';
import clsx from 'clsx';

interface PackageFamiliesAndDocumentsProps {
  familiesCount: number;
  documentsCount: number;
  className?: string;
}

const textClassName = 'text-black text-xs md:text-sm !leading-5 md:!leading-17 font-inter';

export const PackageFamiliesAndDocuments = ({
  familiesCount,
  documentsCount,
  className,
}: PackageFamiliesAndDocumentsProps) => {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <span className={textClassName}>
        {familiesCount} {pluralize('family', familiesCount)}
      </span>
      <AtlusCircle className="bg-light-grey" width={4} height={4} />
      <span className={textClassName}>
        {documentsCount} {pluralize('document', documentsCount)}
      </span>
    </div>
  );
};
