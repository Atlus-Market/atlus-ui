'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectActivePage } from '@/redux/features/share-package/selectors/share-package.selectors';
import { SharePackagePage } from '@/app/(main)/package/share/broker/components/commom/share-package-page';
import { FindRecipientsPage } from '@/app/(main)/package/share/broker/pages/find-recipients/find-recipients-page';
import { SendMessagePage } from '@/app/(main)/package/share/broker/pages/send-message/send-message-page';

export const ShareBrokerPackageBody = () => {
  const activePage = useAppSelector(selectActivePage);

  if (activePage === SharePackagePage.FindRecipients) {
    return <FindRecipientsPage />;
  }

  if (activePage === SharePackagePage.SendMessage) {
    return <SendMessagePage />;
  }

  return null;
};
