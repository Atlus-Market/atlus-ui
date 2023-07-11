import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import {
  CreateBrokerAccount
} from '@/app/onboarding/broker/create-account/components/create-broker-account';

export default function BrokerCreateAccountPage() {
  return (
    <>
      <AtlusTitle
        text='Sign up as a broker'
        className='mb-12 text-center'
      />
      <CreateBrokerAccount />
    </>
  );
}
