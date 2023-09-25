'use client';

import { pluralize } from '@/utils/words';
import clsx from 'clsx';
import { useViewPackagePatentsContext } from '@/app/package/[id]/components/package-patents/components/view-package-patents/use-view-package-patents-context';
import { Patent } from '@/models/patent';

interface PatentsInFamilyLinkProps {
  patents: Patent[];
  familyNumber: number;
}

export const PatentsInFamilyLink = ({ patents, familyNumber }: PatentsInFamilyLinkProps) => {
  const { setPatents } = useViewPackagePatentsContext();
  const totalPatents = patents.length;

  if (totalPatents <= 1) {
    return null;
  }

  const label = `${totalPatents} ${pluralize('patent', totalPatents)} in this family`;
  return (
    <button
      className={clsx('text-orange', 'text-xs md:text-[13px]', 'font-medium')}
      onClick={() => {
        setPatents([
          {
            patents,
            familyNumber,
          },
        ]);
      }}
    >
      {label}
    </button>
  );
};
