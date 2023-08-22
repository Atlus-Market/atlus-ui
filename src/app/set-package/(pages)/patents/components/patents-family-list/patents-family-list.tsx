'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectPatents } from '@/redux/features/set-package/selectors/set-package.selectors';
import { NoPatents } from '@/app/set-package/(pages)/patents/components/no-patents';
import {
  useFamilyPatentsHelper
} from '@/app/set-package/(pages)/patents/hooks/use-family-patents-helper';
import { Header } from '@/app/set-package/(pages)/patents/components/patents-family-list/header';
import {
  PatentsFamily
} from '@/app/set-package/(pages)/patents/components/patents-family-list/patents-family';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';
import { SetPackagePackageDetails } from '@/constants/routes';
import { SetPackageFooter } from '@/app/set-package/components/set-package-footer';

export const PatentsFamilyList = () => {
  const familyPatents = useAppSelector(selectPatents);
  const { familiesCount, patentsCount, familyIds } = useFamilyPatentsHelper(familyPatents);

  if (!familiesCount) {
    return <NoPatents />;
  }

  return (
    <div>
      <Header familiesCount={familiesCount} patentsCount={patentsCount} />
      <div>
        {familyIds.map(familyId => (
          <PatentsFamily key={familyId} familyId={familyId} patents={familyPatents[familyId]} />
        ))}
      </div>
      <SetPackageFooter>
        <Link href={SetPackagePackageDetails} className='block'>
          <AtlusButton variant='solid'>Next</AtlusButton>
        </Link>
      </SetPackageFooter>
    </div>
  );
};
