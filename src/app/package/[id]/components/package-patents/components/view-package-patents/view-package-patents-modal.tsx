'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { useViewPackagePatentsContext } from '@/app/package/[id]/components/package-patents/components/view-package-patents/use-view-package-patents-context';

export const ViewPackagePatentsModal = () => {
  const { patents, clear } = useViewPackagePatentsContext();

  if (patents.length === 0) {
    return null;
  }

  return (
    <AtlusModal
      isOpen={true}
      overlayClassName="z-[2]"
      onRequestClose={clear}
      modalBodyClassName="max-h-[80%]"
    >
      <AtlusModalContainer
        header={
          <AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={clear} />}>
            <AtlusModalTitle text="Patents in this package" />
          </AtlusModalHeader>
        }
        footer={
          <AtlusModalFooter className="!justify-center">
            <div>footer</div>
          </AtlusModalFooter>
        }
      >
        <AtlusModalBody className="w-[650px]">Patents table</AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
