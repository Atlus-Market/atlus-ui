'use client';

import { useSelector } from 'react-redux';
import {
  selectSelectedPatents
} from '@/redux/features/set-package/selectors/add-patents-selectors';
import { pluralize } from '@/utils/words';

export const SelectedPatents = () => {
  const selectedPatents = useSelector(selectSelectedPatents);

  const count = selectedPatents.length;

  if (!count) {
    return null;
  }

  return (
    <div>
      <span
        className='text-sm text-orange font-medium'>{count} patent {pluralize('asset', count)}  selected</span>
    </div>
  );
};
