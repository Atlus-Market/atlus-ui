import { NoData } from '@/app/dashboard/components/no-data';
import { User } from '@/models/user';
import { CreatePackageButton } from '@/app/dashboard/(broker)/components/create-package-button';
import OnlinePresentationImageSvg from '@/public/assets/images/online-presentantion.svg';

interface BrokerWelcomeProps {
  user: User;
}

export const BrokerWelcome = ({ user }: BrokerWelcomeProps) => {
  return (
    <NoData
      image={OnlinePresentationImageSvg}
      title={`Welcome to Atlus, ${user.firstName}!`}
      subtitle="Get started by creating your first package"
      footer={<CreatePackageButton />}
    />
  );
};