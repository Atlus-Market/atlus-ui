import { AtlusDivider } from '@/components/ui/divider/atlus-divider';
import clsx from 'clsx';

interface PackageDividerProps {
  className?: string;
}

export const PackageDivider = ({ className }: PackageDividerProps) => (
  <AtlusDivider className={clsx('my-6 md:my-8', className)} />
);
