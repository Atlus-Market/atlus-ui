import { UserInfo } from '@/components/common/user-info/user-info';
import { ContactBrokerButton } from '@/app/package/[id]/components/right-panel/contact-broker-button';
import { User } from '@/models/user';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { UserInfoFullName } from '@/components/common/user-info/user-info-full-name';
import { UserInfoCompanyName } from '@/components/common/user-info/user-info-company-name';

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

      <UserInfo
        avatar={<AtlusAvatar data={{ firstName: broker.fullName }} className="w-64 md:w-72" />}
        fullName={<UserInfoFullName fullName={broker.fullName} />}
        companyName={<UserInfoCompanyName companyName={broker.companyName} />}
      />
      <ContactBrokerButton />
    </div>
  );
};
