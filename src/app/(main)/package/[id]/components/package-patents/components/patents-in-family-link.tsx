'use client';

import { pluralize } from '@/utils/words';
import clsx from 'clsx';
import { useViewPackagePatentsContext } from '@/app/(main)/package/[id]/components/package-patents/components/view-package-patents/use-view-package-patents-context';
import { FamilyPatentGroup } from '@/app/(main)/set-package/[id]/(pages)/patents/components/patents-family-list/use-group-patents-by-family-id';

interface PatentsInFamilyLinkProps {
  familyPatentGroup: FamilyPatentGroup;
}

export const PatentsInFamilyLink = ({ familyPatentGroup }: PatentsInFamilyLinkProps) => {
  const { setPatents } = useViewPackagePatentsContext();
  const totalPatents = Object.values(familyPatentGroup).flat().length;

  if (totalPatents <= 1) {
    return null;
  }

  const label = `${totalPatents} ${pluralize('patent', totalPatents)} in this family`;
  return (
    <button
      className={clsx('text-orange', 'text-xs md:text-13', 'font-medium')}
      onClick={() => {
        setPatents(familyPatentGroup);
      }}
    >
      {label}
    </button>
  );
};
