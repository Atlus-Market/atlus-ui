import { CreateUserAccount } from '@/app/onboarding/components/create-user-account';
import {
  CreateBrokerAccountForm
} from '@/app/onboarding/broker/create-account/components/create-broker-account-form';

export const CreateBrokerAccount = () => {
  return (
    <CreateUserAccount formCmp={CreateBrokerAccountForm} />
  );
};
