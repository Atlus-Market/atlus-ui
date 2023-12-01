'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { setActivePage } from '@/redux/features/share-package/share-package';
import { SharePackagePage } from '@/app/(main)/package/share/broker/components/commom/share-package-page';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectFindRecipientsActiveTab,
  selectSelectedRecipients,
} from '@/redux/features/share-package/selectors/find-recipients.selectors';
import { SharePackageFindRecipientsTab } from '@/app/(main)/package/share/broker/pages/find-recipients/components/common/share-package-find-recipients-tab';

export const SharePackageFindRecipientsNextButton = () => {
  const dispatch = useAppDispatch();
  const recipients = useAppSelector(selectSelectedRecipients);
  const activeTab = useAppSelector(selectFindRecipientsActiveTab);

  if (activeTab === SharePackageFindRecipientsTab.SharedWith) {
    return null;
  }

  return (
    <AtlusButton
      disabled={recipients.length === 0}
      variant="solid"
      color="orange"
      onClick={() => dispatch(setActivePage(SharePackagePage.SendMessage))}
    >
      Next
    </AtlusButton>
  );
};
