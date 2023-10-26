import Link from 'next/link';
import { PackagePageUrl } from '@/constants/routes';
import { AtlusButton } from '@/components/ui/button/atlus-button';

interface ViewPackageButtonProps {
  packageId: string;
}

export const ViewPackageButton = ({ packageId }: ViewPackageButtonProps) => {
  return (
    <Link href={PackagePageUrl(packageId)}>
      <AtlusButton>View Package</AtlusButton>
    </Link>
  );
};
