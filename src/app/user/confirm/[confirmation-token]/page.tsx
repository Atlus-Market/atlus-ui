import { ConfirmAccount } from '@/app/user/confirm/[confirmation-token]/components/confirm-account';

export default async function UserConfirmPage() {
  return (
    <div>
      Confirm email
      <ConfirmAccount />
    </div>
  );
}
