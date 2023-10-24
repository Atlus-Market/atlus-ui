import { PackageOwner } from '@/app/package/[id]/components/package-owner/package-owner';
import { ContactBrokerButton } from '@/app/package/[id]/components/right-panel/contact-broker-button';
import { User } from '@/models/user';

interface ContactBrokerProps {
  broker: User;
}

export const ContactBroker = ({ broker }: ContactBrokerProps) => {
  return (
    <div className="border border-lightest-grey rounded-xl p-6">
      <span className="block text-black text-xl mb-[10px] font-geologica">Questions?</span>
      <span className="block text-black text-base font-inter leading-6 mb-[18px]">
        Contact the broker for this listing
      </span>

      <PackageOwner broker={broker} />

      <ContactBrokerButton />
    </div>
  );
};
