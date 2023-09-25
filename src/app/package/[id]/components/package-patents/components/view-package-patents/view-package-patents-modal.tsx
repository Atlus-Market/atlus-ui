'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { useViewPackagePatentsContext } from '@/app/package/[id]/components/package-patents/components/view-package-patents/use-view-package-patents-context';
import { PackagePatentsTable } from '@/app/package/[id]/components/package-patents/components/package-patents-table';
import { HiArrowLeft } from 'react-icons/hi2';
import CircleSVG from '@/public/assets/images/circle.svg';
import Image from 'next/image';
import { pluralize } from '@/utils/words';
import { useState } from 'react';
import { Patent } from '@/models/patent';
import { AtlusExpandButton } from '@/components/ui/button/atlus-expand-button';

const MIN_PATENTS_TO_SHOW = 3;

export const ViewPackagePatentsModal = () => {
  const {
    patentsFamily: { patents, familyNumber },
    clear,
  } = useViewPackagePatentsContext();

  const [patentsToShow, setPatentsToShow] = useState<Patent[]>(
    patents.slice(0, MIN_PATENTS_TO_SHOW)
  );
  const patentsCountDiff = patents.length - MIN_PATENTS_TO_SHOW;
  const isExpanded = patents.length === patentsToShow.length;

  if (patents.length === 0) {
    return null;
  }

  return (
    <AtlusModal
      isOpen={true}
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
          <div className="text-sm md:text-base mb-[13px] md:mb-4">
            <span className="text-soft-black">Family {familyNumber}</span>
            <Image src={CircleSVG} alt="circle" className="inline-block mx-[11px]" />
            <span className="text-dark-grey">
              {patents.length} {pluralize('patent', patents.length)}
            </span>
          </div>
          <PackagePatentsTable patents={patentsToShow} type="full" />
          {patentsCountDiff > 0 && (
            <div className="w-full flex justify-center mt-3 md:mt-4">
              <AtlusExpandButton
                text={isExpanded ? 'Show less' : `Show ${patentsCountDiff} more`}
                isExpanded={isExpanded}
                onClick={() => {
                  if (isExpanded) {
                    setPatentsToShow(patents.slice(0, MIN_PATENTS_TO_SHOW));
                  } else {
                    setPatentsToShow(patents);
                  }
                }}
              />
            </div>
          )}
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
