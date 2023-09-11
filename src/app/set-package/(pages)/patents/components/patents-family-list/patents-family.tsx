import { Patent as PatentModel } from '@/models/patent';
import clsx from 'clsx';
import pluralizeWord from 'pluralize';
import { Patent } from '@/app/set-package/(pages)/patents/components/patents-family-list/patents/patent';
import { NO_FAMILY_GROUP_ID } from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/use-table-group-patents-by-family';
import { useState } from 'react';
import { HiChevronDown, HiChevronUp, HiTrash } from 'react-icons/hi2';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { getPatentId } from '@/utils/patents';

interface PatentProps {
  familyId: string;
  patents: PatentModel[];
  onRemoveFamily: () => void;
}

export const PatentsFamily = ({ familyId, patents, onRemoveFamily }: PatentProps) => {
  const patentsCount = patents.length;
  const isCreatedManually = familyId === NO_FAMILY_GROUP_ID;
  const [showingExpandedPatentsList, setShowingExpandedPatentsList] = useState<boolean>(false);

  const patentsToShow = showingExpandedPatentsList ? patents : patents.slice(0, 1);
  return (
    <div
      className={clsx(
        '[&:not(:last-child)]:mb-8',
        'border border-lightest-grey border-solid',
        'rounded-t-[12px]',
        'overflow-hidden'
      )}
    >
      <div className={clsx('bg-lightest-grey', 'px-6 py-4', 'flex justify-between items-center')}>
        <div>
          <span className="text-sm text-dark-grey">
            {patentsCount} {pluralizeWord('patent', patentsCount)} in this family
          </span>
        </div>
        <div className="flex items-center">
          {isCreatedManually && (
            <span className="text-xs text-dark-grey inline-block mr-4">Created Manually</span>
          )}

          <AtlusMenu
            menuButton={
              <button>
                <HiOutlineDotsVertical className="text-dark-grey" />
              </button>
            }
            menuItems={
              <AtlusMenuItem text="Remove family" icon={HiTrash} onClick={onRemoveFamily} />
            }
          />
        </div>
      </div>
      <div>
        {patentsToShow.map(patent => (
          <Patent key={getPatentId(patent)} patent={patent} />
        ))}
      </div>
      {patents.length > 1 && (
        <div className="px-6 pb-4">
          <button
            className="text-orange text-xs font-medium flex items-center"
            onClick={() => setShowingExpandedPatentsList(!showingExpandedPatentsList)}
          >
            {showingExpandedPatentsList ? (
              <>
                Show less <HiChevronUp size={16} className="ml-[3px]" />
              </>
            ) : (
              <>
                See all {patents.length} patents <HiChevronDown size={16} className="ml-[3px]" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
