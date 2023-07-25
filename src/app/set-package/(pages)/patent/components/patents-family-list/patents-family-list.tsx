'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectPatents } from '@/redux/features/set-package/selectors/set-package.selectors';
import { NoPatents } from '@/app/set-package/(pages)/patent/components/no-patents';
import {
  useFamilyPatentsHelper
} from '@/app/set-package/(pages)/patent/hooks/use-family-patents-helper';
import { Header } from '@/app/set-package/(pages)/patent/components/patents-family-list/header';
import {
  PatentsFamily
} from '@/app/set-package/(pages)/patent/components/patents-family-list/patents-family';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';
import { SetPackagePackageDetails } from '@/constants/routes';

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
      <div className='flex justify-end w-full p-5'>
        <Link href={SetPackagePackageDetails} className='block'>
          <AtlusButton variant='solid' size='medium'>Next</AtlusButton>
        </Link>
      </div>
    </div>
  );
};
