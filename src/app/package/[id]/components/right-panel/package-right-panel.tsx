import { ContactBroker } from '@/app/package/[id]/components/right-panel/contact-broker';
import { User } from '@/models/user';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiPencil } from 'react-icons/hi2';
import { SharePackage } from '@/app/package/[id]/components/right-panel/share-package';
import Link from 'next/link';
import { SetPackagePatent } from '@/constants/routes';

interface PackageRightPanelProps {
  packageId: string;
  broker: User;
}

export const PackageRightPanel = ({ broker, packageId }: PackageRightPanelProps) => {
  return (
    <div>
      <div className="hidden md:flex justify-end items-center gap-4 mb-4">
        <Link href={SetPackagePatent(packageId)}>
          <AtlusButton variant="clear">
            <HiPencil className="mr-[10px] text-xl" /> Edit
          </AtlusButton>
        </Link>
        <SharePackage packageId={packageId} />
      </div>
      <ContactBroker broker={broker} />
    </div>
  );
};
