import { Patent as PatentModel } from '@/models/patent';
import DocumentSVG from '@/public/assets/images/document.svg';
import Image from 'next/image';
import { ManageEditedPatent } from '@/app/set-package/(pages)/patents/components/patents-family-list/patents/manage-edited-patent';

interface PatentProps {
  patent: PatentModel;
}

export const Patent = ({ patent }: PatentProps) => {
  return (
    <div className="flex item-start justify-between px-6 py-4">
      <div className="flex item-start justify-between">
        <div className="inline-block mr-[43px] flex-shrink-0">
          <Image
            src={DocumentSVG}
            alt="Document"
            width={126}
            height={126}
            className="h-full max-h-[126px]"
          />
        </div>
        <div>
          <div className="mb-1">
            <span className="text-sm text-[#0E7580]">
              {patent.publicationNumber || patent.patentNumber}
            </span>
          </div>
          <div className="mb-7">
            <span className="text-soft-black text-[15px] leading-5 font-medium">
              {patent.title}
            </span>
          </div>
          <div>
            <span className="text-xs leading-5 text-dark-grey">Assigned to</span>
          </div>
          <div>
            <span className="text-soft-black text-sm leading-5">
              {(patent.applicants ?? []).join(' & ')}
            </span>
          </div>
        </div>
      </div>
      <ManageEditedPatent patent={patent} />
    </div>
  );
};
