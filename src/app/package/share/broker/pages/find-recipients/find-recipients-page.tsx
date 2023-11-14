'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectFindRecipientsActiveTab } from '@/redux/features/share-package/selectors/find-recipients.selectors';
import clsx from 'clsx';
import { AtlusModalBody, atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';
import { SharePackageTabsHeader } from '@/app/package/share/broker/pages/find-recipients/components/share-package-tabs-header';
import { SharePackageFindRecipientsTab } from '@/app/package/share/broker/pages/find-recipients/components/common/share-package-find-recipients-tab';
import { ContactsTab } from '@/app/package/share/broker/pages/find-recipients/components/contacts-tab/contacts-tab';
import { DirectoryTab } from '@/app/package/share/broker/pages/find-recipients/components/directory-tab/directory-tab';
import { SharedWithTab } from '@/app/package/share/broker/pages/find-recipients/components/shared-with-tab/shared-with-tab';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { SharePackageFooter } from '@/app/package/share/broker/components/commom/share-package-footer';
import { useSharePackageVisibility } from '@/app/package/share/hooks/use-share-package-visibility';
import { SharePackageFindRecipientsNextButton } from '@/app/package/share/broker/pages/find-recipients/components/share-package-find-recipients-next-button';

export const FindRecipientsPage = () => {
  const { hideSharePackageModal } = useSharePackageVisibility();
  const activeTab = useAppSelector(selectFindRecipientsActiveTab);

  return (
    <AtlusModalContainer
      header={
        <AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={hideSharePackageModal} />}>
          <AtlusModalTitle text="Share package" />
        </AtlusModalHeader>
      }
      footer={
        <AtlusModalFooter className="bg-lightest-grey">
          <SharePackageFooter>
            <SharePackageFindRecipientsNextButton />
          </SharePackageFooter>
        </AtlusModalFooter>
      }
    >
      <AtlusModalBody className="md:!w-[540px] !py-0 !px-0">
        <div>
          <div className={clsx(atlusModalBodyPaddingX)}>
            <SharePackageTabsHeader />
          </div>
          <div className="py-5">
            <div
              className={clsx(
                activeTab === SharePackageFindRecipientsTab.Contacts ? 'block' : 'hidden'
              )}
            >
              <ContactsTab />
            </div>
            <div
              className={clsx(
                activeTab === SharePackageFindRecipientsTab.Directory ? 'block' : 'hidden'
              )}
            >
              <DirectoryTab />
            </div>
            <div
              className={clsx(
                activeTab === SharePackageFindRecipientsTab.SharedWith ? 'block' : 'hidden'
              )}
            >
              <SharedWithTab />
            </div>
          </div>
        </div>
      </AtlusModalBody>
    </AtlusModalContainer>
  );
};
