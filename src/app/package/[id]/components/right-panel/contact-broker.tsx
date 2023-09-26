import clsx from 'clsx';
import { geologica, inter } from '@/components/ui/theme/fonts';
import {
  BrokerAvatarInfo,
  PackageOwner,
} from '@/app/package/[id]/components/package-owner/package-owner';
import { AtlusButton } from '@/components/ui/button/atlus-button';

interface ContactBrokerProps {
  broker: BrokerAvatarInfo;
}

export const ContactBroker = ({ broker }: ContactBrokerProps) => {
  return (
    <div className="border border-lightest-grey rounded-xl p-6">
      <span className={clsx('block text-black text-xl mb-[10px]', geologica.className)}>
        Questions?
      </span>
      <span className={clsx('block text-black text-base leading-6 mb-[18px]', inter.className)}>
        Contact the broker for this listing
      </span>

      <PackageOwner
        fullName={broker.fullName}
        companyName={broker.companyName}
        profilePictureUrl={broker.profilePictureUrl}
      />

      <AtlusButton variant="solid" className="mt-6 w-full">
        Contact broker
      </AtlusButton>
    </div>
  );
};
