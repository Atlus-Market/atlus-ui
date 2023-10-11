import clsx from 'clsx';
import { geologica, inter } from '@/components/ui/theme/fonts';
import {
  BrokerAvatarInfo,
  PackageOwner,
} from '@/app/package/[id]/components/package-owner/package-owner';
import { ContactBrokerButton } from '@/app/package/[id]/components/right-panel/contact-broker-button';

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

      <PackageOwner broker={broker} />

      <ContactBrokerButton />
    </div>
  );
};
