import { ContactBroker } from '@/app/package/[id]/components/right-panel/contact-broker';
import { User } from '@/models/user';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiPencil, HiShare } from 'react-icons/hi2';

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
        <AtlusButton variant="clear">
          <HiShare className="mr-[10px]" /> Share
        </AtlusButton>
      </div>
      <ContactBroker broker={broker} />
    </div>
  );
};
