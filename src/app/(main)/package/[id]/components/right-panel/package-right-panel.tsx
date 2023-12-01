import { ContactBroker } from '@/app/(main)/package/[id]/components/right-panel/contact-broker';
import { User } from '@/models/user';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiPencil } from 'react-icons/hi2';
import { SharePackageButton } from '@/app/(main)/package/[id]/components/right-panel/share-package-button';
import Link from 'next/link';
import { SetPackagePatent } from '@/constants/routes';
import { Package } from '@/models/package';

interface PackageRightPanelProps {
  atlusPackage: Package;
  broker: User;
  renderLimitedContent: boolean;
  showEditPackageButton: boolean;
}

export const PackageRightPanel = ({
  broker,
  atlusPackage,
  renderLimitedContent,
  showEditPackageButton,
}: PackageRightPanelProps) => {
  return (
    <div className="hidden lg:block">
      {!renderLimitedContent && (
        <div className="hidden md:flex justify-end items-center gap-4 mb-4">
          {showEditPackageButton && (
            <Link href={SetPackagePatent(atlusPackage.id)}>
              <AtlusButton
                variant="clear"
                color="dark-grey"
                className="atlus-btn-36 md:atlus-btn-40"
                leftIcon={<HiPencil />}
              >
                Edit
              </AtlusButton>
            </Link>
          )}
          <SharePackageButton atlusPackage={atlusPackage} />
        </div>
      )}
      <ContactBroker broker={broker} />
    </div>
  );
};
