'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { useViewPackagePatentsContext } from '@/app/package/[id]/components/package-patents/components/view-package-patents/use-view-package-patents-context';
import { HiArrowLeft } from 'react-icons/hi2';
import { Fragment } from 'react';
import { ViewPackagePatentsModalTable } from '@/app/package/[id]/components/package-patents/components/view-package-patents/view-package-patents-modal-table';

export const ViewPackagePatentsModal = () => {
  const { patentsFamilies, clear } = useViewPackagePatentsContext();

  return (
    <AtlusModal
      isOpen={patentsFamilies.length > 0}
      overlayClassName="z-[2]"
      onRequestClose={clear}
      modalBodyClassName="h-screen !max-h-none"
    >
      <AtlusModalContainer
        className="!h-full !max-h-min"
        containerClassName="w-screen lg:w-auto lg:max-w-[1200px] !overflow-x-auto"
        header={
          <AtlusModalHeader
            rightContent={
              <div className="hidden md:block">
                <AtlusCloseModalButton onClick={clear} />
              </div>
            }
          >
            <div className="flex flex-col items-start">
              <div className="block md:hidden pb-4">
                <AtlusCloseModalButton onClick={clear} icon={HiArrowLeft} />
              </div>
              <AtlusModalTitle text="Patents in this package" />
            </div>
          </AtlusModalHeader>
        }
      >
        <AtlusModalBody className="overflow-x-auto">
          {patentsFamilies.map((patentFamily, index) => (
            <Fragment key={`${index}-${patentFamily.familyNumber}`}>
              <ViewPackagePatentsModalTable patentsFamily={patentFamily} />
            </Fragment>
          ))}
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
