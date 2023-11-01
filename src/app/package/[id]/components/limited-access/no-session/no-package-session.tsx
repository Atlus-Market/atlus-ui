import { LimitedAccessFooter } from '@/app/package/[id]/components/limited-access/limited-access-footer';
import { RequestPackagePermissionTitle } from '@/app/package/[id]/components/limited-access/common/request-package-permission-title';
import { RequestPackagePermissionSubtitle } from '@/app/package/[id]/components/limited-access/common/request-package-permission-subtitle';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';
import { OnboardingSelectUser, PackagePageUrl } from '@/constants/routes';
import { HiCheckCircle } from 'react-icons/hi2';
import { createLoginWithCallbackUrl } from '@/app/(auth)/login/login.utils';

interface NoPackageSessionProps {
  packageId: string;
}

export const NoPackageSession = ({ packageId }: NoPackageSessionProps) => {
  const checkIcon = <HiCheckCircle className="text-orange text-base" />;

  return (
    <LimitedAccessFooter>
      <RequestPackagePermissionTitle text="Get access to the full package" />
      <RequestPackagePermissionSubtitle
        content={
          <>
            {checkIcon}
            <span>Discover patents and packages</span>
          </>
        }
        className="!mb-2 md:!mb-3"
      />
      <RequestPackagePermissionSubtitle
        content={
          <>
            {checkIcon}
            <span>Connect with the world’s best brokers</span>
          </>
        }
        className="!mb-2 md:!mb-3"
      />
      <RequestPackagePermissionSubtitle
        content={
          <>
            {checkIcon}
            <span>Track every step of your deal journey</span>
          </>
        }
      />

      <Link href={OnboardingSelectUser}>
        <AtlusButton variant="outline" color="orange" className="mb-4">
          Join Atlus – it’s free!
        </AtlusButton>
      </Link>

      <div className="leading-none text-13 font-medium">
        <span>Have an account?</span>
        <Link href={createLoginWithCallbackUrl(PackagePageUrl(packageId))}>
          <span className="text-orange ml-1">Sign in</span>
        </Link>
      </div>
    </LimitedAccessFooter>
  );
};
