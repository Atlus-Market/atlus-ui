'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectPatents } from '@/redux/features/set-package/selectors/set-package.selectors';
import { NoPatents } from '@/app/set-package/(pages)/patent/components/no-patents';
import {
  useFamilyPatentsCount
} from '@/app/set-package/(pages)/patent/hooks/use-family-patents-count';
import { Header } from '@/app/set-package/(pages)/patent/components/patents-list/header';

export const PatentsList = () => {
  const familyPatents = useAppSelector(selectPatents);

  const { familiesCount, patentsCount } = useFamilyPatentsCount(familyPatents);

  if (!familiesCount) {
    return <NoPatents />;
  }

  return (
    <div>
      <Header familiesCount={familiesCount} patentsCount={patentsCount} />
    </div>
  );
};
