import Image from 'next/image';
import CircleSVG from '@/public/assets/images/circle.svg';
import { pluralize } from '@/utils/words';
import { PackagePatentsTable } from '@/app/package/[id]/components/package-patents/components/package-patents-table';
import { AtlusExpandButton } from '@/components/ui/button/atlus-expand-button';
import { useEffect, useState } from 'react';
import { Patent } from '@/models/patent';

interface ViewPackagePatentsTableProps {
  familyId: string;
  patents: Patent[];
}

const MIN_PATENTS_TO_SHOW = 3;

export const ViewPackagePatentsModalTable = ({
  patents,
  familyId,
}: ViewPackagePatentsTableProps) => {
  const [patentsToShow, setPatentsToShow] = useState<Patent[]>(
    patents.slice(0, MIN_PATENTS_TO_SHOW)
  );
  const patentsCountDiff = patents.length - MIN_PATENTS_TO_SHOW;
  const isExpanded = patents.length === patentsToShow.length;

  useEffect(() => {
    setPatentsToShow(patents.slice(0, MIN_PATENTS_TO_SHOW));
  }, [patents]);

  return (
    <div className="mb-8">
      <div className="text-sm md:text-base mb-[13px] md:mb-4">
        <span className="text-soft-black">Family {familyId}</span>
        <Image src={CircleSVG} alt="circle" className="inline-block mx-[11px]" />
        <span className="text-dark-grey">
          {patents.length} {pluralize('patent', patents.length)}
        </span>
      </div>
      <PackagePatentsTable familyPatents={{ [familyId]: patentsToShow }} type="full" />
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
    </div>
  );
};
