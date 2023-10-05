import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiLink } from 'react-icons/hi2';

export const SharePackageFooter = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <AtlusButton variant="clear">
        <HiLink size={20} className="mr-[10px]" /> Copy Link
      </AtlusButton>
      <AtlusButton variant="solid">Next</AtlusButton>
    </div>
  );
};
