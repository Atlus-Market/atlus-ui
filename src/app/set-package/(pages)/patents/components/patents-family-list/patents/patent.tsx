import { Patent as PatentModel } from '@/models/patent';
import DocumentSVG from '@/public/assets/images/document.svg';
import Image from 'next/image';
import { ManageEditedPatent } from '@/app/set-package/(pages)/patents/components/patents-family-list/patents/manage-edited-patent';
import { getPatentId, getPatentReadableAssignees } from '@/utils/patents';
import { AtlusImageZoom } from '@/components/common/atlus-image-zoom';

interface PatentProps {
  patent: PatentModel;
}

export const Patent = ({ patent }: PatentProps) => {
  return (
    <div className="flex item-start justify-between px-6 py-4">
      <div className="flex item-start justify-between">
        <div className="inline-block mr-[43px] flex-shrink-0">
          {patent.thumbnail ? (
            <AtlusImageZoom>
              <img
                src={patent.thumbnail}
                alt="patent thumbnail"
                width="auto"
                height={126}
                className="!h-[126px]"
              />
            </AtlusImageZoom>
          ) : (
            <Image
              src={DocumentSVG}
              alt="Document"
              width={126}
              height={126}
              style={{
                width: '100%',
                height: 'auto',
              }}
              className="h-full max-h-[126px]"
            />
          )}
        </div>
        <div>
          <div className="mb-1">
            <span className="text-sm text-dark-cyan">{getPatentId(patent)}</span>
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
              {getPatentReadableAssignees(patent)}
            </span>
          </div>
        </div>
      </div>
      <ManageEditedPatent patent={patent} />
    </div>
  );
};
