import { Patent as PatentModel } from '@/models/patent';
import clsx from 'clsx';
import pluralizeWord from 'pluralize';
import {
  Patent
} from '@/app/set-package/(pages)/patents/components/patents-family-list/patents/patent';
import {
  NO_FAMILY_GROUP_ID
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/use-table-group-patents-by-family';
import { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { HiOutlineDotsVertical } from 'react-icons/hi';

interface PatentProps {
  familyId: string;
  patents: PatentModel[];
}

export const PatentsFamily = ({ familyId, patents }: PatentProps) => {
  const patentsCount = patents.length;
  const isCreatedManually = familyId === NO_FAMILY_GROUP_ID;
  const [showingExpandedPatentsList, setShowingExpandedPatentsList] = useState<boolean>(false);

  const patentsToShow = showingExpandedPatentsList ? patents : patents.slice(0, 1);
  return (
    <div className={clsx(
      '[&:not(:last-child)]:mb-8',
      'border border-lightest-grey border-solid',
      'rounded-t-[12px]',
      'overflow-hidden'
    )}>
      <div className={clsx('bg-lightest-grey', 'px-6 py-4', 'flex justify-between items-center')}>
        <div>
            <span
              className='text-sm text-dark-grey'>{patentsCount} {pluralizeWord('patent', patentsCount)} in this family
            </span>
        </div>
        <div className="flex items-center">
          {isCreatedManually && <span className='text-xs text-dark-grey inline-block mr-4'>Created Manually</span>}
          <button>
            <HiOutlineDotsVertical className='text-dark-grey' />
          </button>
        </div>
      </div>
      <div>
        {patentsToShow.map(patent => (<Patent key={patent.publicationNumber} patent={patent} />))}
      </div>
      {patents.length > 1 &&
        <div className='px-6 pb-4'>
          <button
            className='text-orange text-xs font-medium flex items-center'
            onClick={() => setShowingExpandedPatentsList(!showingExpandedPatentsList)}>
            {showingExpandedPatentsList ?
              <>Show less <HiChevronUp size={16} className='ml-[3px]' /></> :
              <>See all {patents.length} patents <HiChevronDown size={16} className='ml-[3px]' /></>
            }
          </button>
        </div>
      }
    </div>
  );
};
