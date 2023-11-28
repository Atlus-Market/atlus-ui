import { ConfirmEmailChange } from '@/app/user/email/confirm/[token]/confirm-email-change';
import { AtlusSplashLoader } from '@/components/ui/splash-loader/atlus-splash-loader';
import { confirmEmailChangeOnServer } from '@/api/auth/confirm-email-change-on-server';
import { isAxiosError } from 'axios';

interface UserEmailConfirmPageProps {
  params: {
    token: string;
  };
}

export default async function UserEmailConfirmPage({
  params: { token },
}: UserEmailConfirmPageProps) {
  let confirmEmailChangeResponse = null;
  let errorMessage = null;
  try {
    confirmEmailChangeResponse = await confirmEmailChangeOnServer({ confirmationToken: token });
  } catch (e) {
    console.error(e);
    if (e && isAxiosError(e) && e.response) {
      errorMessage = e.response.data.msg;
    }
  }

  return (
    <div>
      <AtlusSplashLoader />
      <ConfirmEmailChange
        confirmEmailChangeResponse={confirmEmailChangeResponse}
        errorMessage={errorMessage}
      />
    </div>
  );
}
