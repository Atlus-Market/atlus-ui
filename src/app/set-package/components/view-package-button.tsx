'use client';

import Link from 'next/link';
import { PackagePageUrl } from '@/constants/routes';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useParams } from 'next/navigation';

export const ViewPackageButton = () => {
  const params = useParams();
  const packageId = params.id as string;
  return (
    <Link href={PackagePageUrl(packageId)}>
      <AtlusButton>View Package</AtlusButton>
    </Link>
  );
};
