import { ContactBroker } from '@/app/package/[id]/components/right-panel/contact-broker';
import { User } from '@/models/user';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiPencil } from 'react-icons/hi2';
import { SharePackageButton } from '@/app/package/[id]/components/right-panel/share-package-button';
import Link from 'next/link';
import { SetPackagePatent } from '@/constants/routes';

interface PackageRightPanelProps {
  packageId: string;
  broker: User;
  renderLimitedContent: boolean;
}

export const PackageRightPanel = ({
  broker,
  packageId,
  renderLimitedContent,
}: PackageRightPanelProps) => {
  return (
    <div className="hidden lg:block">
      {!renderLimitedContent && (
        <div className="hidden md:flex justify-end items-center gap-4 mb-4">
          <Link href={SetPackagePatent(packageId)}>
            <AtlusButton
              variant="clear"
              color="dark-grey"
              className="atlus-btn-36 md:atlus-btn-40"
              leftIcon={<HiPencil />}
            >
              Edit
            </AtlusButton>
          </Link>
          <SharePackageButton />
        </div>
      )}
      <ContactBroker broker={broker} />
    </div>
  );
};
