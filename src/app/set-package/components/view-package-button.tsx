'use client';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useRouter } from 'next/navigation';
import { PackagePageUrl } from '@/constants/routes';

interface ViewPackageButtonProps {
  packageId: string;
}

export const ViewPackageButton = ({ packageId }: ViewPackageButtonProps) => {
  const router = useRouter();
  return (
    // <Link href={PackagePageUrl(packageId)}>
    <AtlusButton
      onClick={() => {
        // router.refresh();
        router.push(PackagePageUrl(packageId));
      }}
    >
      View Package
    </AtlusButton>
    // </Link>
  );
};
