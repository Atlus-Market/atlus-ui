import DesktopOnlyImageSvg from '@/public/assets/images/desktop-only.svg';
import Image from 'next/image';
import { AtlusLink } from '@/components/ui/link/atlus-link';
import { DashboardRoute } from '@/constants/routes';

export const DesktopOnlyPlaceholder = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <Image src={DesktopOnlyImageSvg} alt="upload-file" className="mb-6" />
      <div className={'text-lg mb-3 font-geologica'}>Switch to desktop</div>
      <div className={'text-sm mb-8 max-w-[75%] font-inter'}>
        This feature isn’t supported on mobile yet. Please visit Atlus on desktop to create and
        manage your packages.
      </div>
      <AtlusLink href={DashboardRoute}>Return to dashboard</AtlusLink>
    </div>
  );
};
