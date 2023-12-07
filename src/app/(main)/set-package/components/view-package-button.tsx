'use client';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { PackagePageUrl } from '@/constants/routes';
import { useAppSelector } from '@/redux/hooks';
import { selectPackage } from '@/redux/features/set-package/selectors/set-package.selectors';
import Link from 'next/link';

export const ViewPackageButton = () => {
  const packageId = useAppSelector(selectPackage)?.id;

  if (!packageId) {
    return null;
  }

  return (
    <Link href={PackagePageUrl(packageId)}>
      <AtlusButton>View Package</AtlusButton>
    </Link>
  );
};
