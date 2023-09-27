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
import { HiDownload } from 'react-icons/hi';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useDownloadPatents } from '@/app/package/[id]/components/package-patents/components/view-package-patents/use-download-patents';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';

interface ViewPackagePatentsModalProps {
  packageId: string;
}

export const ViewPackagePatentsModal = ({ packageId }: ViewPackagePatentsModalProps) => {
  const { patentsFamilies, clear } = useViewPackagePatentsContext();
  const { isFetching, exportPackage } = useDownloadPatents(packageId);

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
              <div className="hidden md:flex items-center gap-5">
                <AtlusButton
                  variant="outline"
                  size="medium"
                  onClick={exportPackage}
                  isLoading={isFetching}
                >
                  <HiDownload size={20} className="mr-[10px]" />
                  Download
                </AtlusButton>
                <AtlusCloseModalButton onClick={clear} />
              </div>
            }
          >
            <div className="flex flex-col items-start w-full">
              <div className="flex justify-between items-center w-full md:hidden pb-4">
                <AtlusCloseModalButton icon={HiArrowLeft} onClick={clear} />
                {isFetching ? (
                  <AtlusLoadingSpinner color="orange" size={14} />
                ) : (
                  <AtlusCloseModalButton icon={HiDownload} onClick={exportPackage} />
                )}
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
