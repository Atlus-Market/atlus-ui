'use client';

import { useSelector } from 'react-redux';
import {
  selectSelectedPatents
} from '@/redux/features/set-package/selectors/add-patents-selectors';

export const SelectedPatents = () => {
  const selectedPatents = useSelector(selectSelectedPatents);

  const count = selectedPatents.length;

  if (!count) {
    return null;
  }

  const assetsWord = count > 1 ? 'assets' : 'asset';
  return (
    <div>
      <span className='text-sm text-orange font-medium'>{count} patent {assetsWord} selected</span>
    </div>
  );
};
