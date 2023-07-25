'use client';

import { useSelector } from 'react-redux';
import {
  selectSelectedFamilyPatents
} from '@/redux/features/set-package/selectors/add-patents-selectors';
import { pluralize } from '@/utils/words';
import {
  useFamilyPatentsCount
} from '@/app/set-package/(pages)/patent/hooks/use-family-patents-count';

export const SelectedPatents = () => {
  const selectedFamilyPatents = useSelector(selectSelectedFamilyPatents);
  const { patentsCount } = useFamilyPatentsCount(selectedFamilyPatents);

  if (!patentsCount) {
    return null;
  }

  return (
    <div>
      <span
        className='text-sm text-orange font-medium'>{patentsCount} patent {pluralize('asset', patentsCount)} selected</span>
    </div>
  );
};
