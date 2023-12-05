'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { useViewPackagePatentsContext } from '@/app/(main)/package/[id]/components/package-patents/components/view-package-patents/use-view-package-patents-context';
import { HiArrowLeft } from 'react-icons/hi2';
import { Fragment } from 'react';
import { ViewPackagePatentsModalTable } from '@/app/(main)/package/[id]/components/package-patents/components/view-package-patents/view-package-patents-modal-table';
import { HiDownload } from 'react-icons/hi';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useDownloadPackagePatents } from '@/hooks/data/use-download-package-patents';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';

interface ViewPackagePatentsModalProps {
  packageId: string;
}

export const ViewPackagePatentsModal = ({ packageId }: ViewPackagePatentsModalProps) => {
  const { familyPatentsGroup, clear } = useViewPackagePatentsContext();
  const { isDownloadingPackagePatents, downloadPackagePatents } =
    useDownloadPackagePatents(packageId);
  const familyIds = Object.keys(familyPatentsGroup);
  const hasPatentsToShow = familyIds.length > 0;

  return (
    <AtlusModal
      isOpen={hasPatentsToShow}
      overlayClassName="z-[2]"
      onRequestClose={clear}
      modalBodyClassName="h-screen !max-h-none"
    >
      {/* Add !basis-auto because on safari, height is zero. */}
      <AtlusModalContainer
        className="!h-full !max-h-min"
        bodyContainerClassName="w-screen lg:!w-auto lg:max-w-[1200px] !overflow-x-auto !basis-auto overscroll-none"
        header={
          <AtlusModalHeader
            rightContent={
              <div className="hidden md:flex items-center gap-5">
                <AtlusButton
                  variant="outline"
                  color="black"
                  className="atlus-btn-40"
                  onClick={downloadPackagePatents}
                  isLoading={isDownloadingPackagePatents}
                  leftIcon={<HiDownload />}
                >
                  Download
                </AtlusButton>
                <AtlusCloseModalButton onClick={clear} />
              </div>
            }
          >
            <div className="flex flex-col items-start w-full">
              <div className="flex justify-between items-center w-full md:hidden pb-4">
                <AtlusCloseModalButton icon={HiArrowLeft} onClick={clear} />
                {isDownloadingPackagePatents ? (
                  <AtlusLoadingSpinner color="orange" size={14} />
                ) : (
                  <AtlusCloseModalButton icon={HiDownload} onClick={downloadPackagePatents} />
                )}
              </div>
              <AtlusModalTitle text="Patents in this package" />
            </div>
          </AtlusModalHeader>
        }
      >
        <AtlusModalBody className="overflow-x-auto !w-fit">
          {familyIds.map(familyId => (
            <Fragment key={familyId}>
              <ViewPackagePatentsModalTable
                familyId={familyId}
                patents={familyPatentsGroup[familyId]}
              />
            </Fragment>
          ))}
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};