import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import clsx from 'clsx';

interface PackageSectionTitleProps {
  title: string;
  classNames?: string;
}

export const PackageSectionTitle = ({ title, classNames }: PackageSectionTitleProps) => {
  return (
    <AtlusTitle
      text={title}
      className={clsx('!font-normal !text-base md:!text-xl text-black mb-4 md:mb-6', classNames)}
    />
  );
};
