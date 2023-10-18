import clsx from 'clsx';
import { inter } from '@/components/ui/theme/fonts';

interface RequestPackagePermissionSubtitleProps {
  text: string;
}

export const RequestPackagePermissionSubtitle = ({
  text,
}: RequestPackagePermissionSubtitleProps) => {
  return <div className={clsx('text-sm md:text-base leading-6 mb-6 md:mb-8', inter)}>{text}</div>;
};
