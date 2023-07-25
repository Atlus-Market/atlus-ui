import { Patent as PatentModel } from '@/models/patent';
import clsx from 'clsx';
import pluralizeWord from 'pluralize';
import {
  Patent
} from '@/app/set-package/(pages)/patent/components/patents-family-list/patents/patent';
import {
  NO_FAMILY_GROUP_ID
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/use-group-patents-by-family';

interface PatentProps {
  familyId: string;
  patents: PatentModel[];
}

export const PatentsFamily = ({ familyId, patents }: PatentProps) => {
  const patentsCount = patents.length;
  const isCreatedManually = familyId === NO_FAMILY_GROUP_ID;
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
        <div>
          {isCreatedManually && <span className="text-xs text-dark-grey">Created Manually</span>}
        </div>
      </div>
      <div>
        {patents.map(patent => (<Patent key={patent.publicationNumber} patent={patent} />))}
      </div>
    </div>
  );
};
