import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { CreateUserAccount } from '@/app/onboarding/components/create-user-account';
import { CreateBuyerAccountForm } from '@/app/onboarding/buyer/create-account/components/create-buyer-account-form';

export default function CreateAccountPage() {
  return (
    <>
      <AtlusTitle text="Great! Let’s set up your account." className="mb-11 text-center" />
      <CreateUserAccount formCmp={CreateBuyerAccountForm} />
    </>
  );
}
