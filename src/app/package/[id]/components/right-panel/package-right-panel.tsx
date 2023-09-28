import { ContactBroker } from '@/app/package/[id]/components/right-panel/contact-broker';
import { User } from '@/models/user';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiPencil } from 'react-icons/hi2';
import { SharePackage } from '@/app/package/[id]/components/right-panel/share-package';

interface PackageRightPanelProps {
  broker: User;
}

export const PackageRightPanel = ({ broker }: PackageRightPanelProps) => {
  return (
    <div>
      <div className="flex justify-end items-center gap-4 mb-4">
        <AtlusButton variant="clear">
          <HiPencil className="mr-[10px]" /> Edit
        </AtlusButton>
        {/*<SharePackage />*/}
      </div>
      <ContactBroker broker={broker} />
    </div>
  );
};
