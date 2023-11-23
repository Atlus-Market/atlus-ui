import { RequestEmailChange } from '@/app/settings/components/email/request-email-change';
import { useCallback, useState } from 'react';
import { ChangeEmailPage } from '@/app/settings/components/email/change-email-page';
import { EmailChangeRequested } from '@/app/settings/components/email/email-change-requested';

interface ChangeEmailBodyProps {
  onCloseModal: () => void;
}

export const ChangeEmailBody = ({ onCloseModal }: ChangeEmailBodyProps) => {
  const [activePage, setActivePage] = useState<ChangeEmailPage>(ChangeEmailPage.RequestChangeEmail);
  const [requestedEmail, setRequestedEmail] = useState<string>('');

  const onRequestEmailSuccess = useCallback((email: string) => {
    setRequestedEmail(email);
    setActivePage(ChangeEmailPage.EmailChangeRequested);
  }, []);

  return (
    <div>
      {activePage === ChangeEmailPage.RequestChangeEmail ? (
        <RequestEmailChange
          onCloseModal={onCloseModal}
          onRequestEmailSuccess={onRequestEmailSuccess}
        />
      ) : (
        <EmailChangeRequested requestedEmail={requestedEmail} onCloseModal={onCloseModal} />
      )}
    </div>
  );
};
