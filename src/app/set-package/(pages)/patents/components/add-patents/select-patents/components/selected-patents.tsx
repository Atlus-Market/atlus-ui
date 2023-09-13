'use client';

import { useSelector } from 'react-redux';
import { pluralize } from '@/utils/words';
import { selectTableSelectedPatentIds } from '@/redux/features/set-package/selectors/add-patents.selectors';

export const SelectedPatents = () => {
  const selectedPatentIds = useSelector(selectTableSelectedPatentIds);
  const patentsCount = selectedPatentIds.length;

  if (!patentsCount) {
    return null;
  }

  return (
    <div>
      <span className="text-sm text-orange font-medium">
        {patentsCount} patent {pluralize('asset', patentsCount)} selected
      </span>
    </div>
  );
};
