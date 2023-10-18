import clsx from 'clsx';
import { geologica } from '@/components/ui/theme/fonts';

interface RequestPackagePermissionTitleProps {
  text: string;
}

export const RequestPackagePermissionTitle = ({ text }: RequestPackagePermissionTitleProps) => {
  return <div className={clsx('text-lg md:text-2xl mb-4 md:mb-6', geologica)}>{text}</div>;
};
