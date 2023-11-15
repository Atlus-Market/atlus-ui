import { SetNewPackageUrl } from '@/constants/routes';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';

export const CreatePackageButton = () => {
  return (
    <Link href={SetNewPackageUrl}>
      <AtlusButton variant="solid" color="orange" className="atlus-btn-38 md:atlus-btn-45">
        Create Package
      </AtlusButton>
    </Link>
  );
};
