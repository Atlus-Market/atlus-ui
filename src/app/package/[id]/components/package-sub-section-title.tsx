import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import clsx from 'clsx';

interface PackageSubSectionTitleProps {
  title: string;
  classNames?: string;
}

export const PackageSubSectionTitle = ({ title, classNames }: PackageSubSectionTitleProps) => {
  return (
    <AtlusTitle
      text={title}
      className={clsx('!text-13 md:!text-sm !text-dark-grey mb-2 md:mb-[11px]', classNames)}
    />
  );
};
