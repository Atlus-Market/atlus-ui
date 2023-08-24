'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectIsFetchingPackage,
  selectPackagesList
} from '@/redux/features/packages/selectors/packages.selectors';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { fetchPackage } from '@/redux/features/packages/thunks/get-package.thunks';
import { useRouter } from 'next/navigation';
import { SetPackagePatent } from '@/constants/routes';
import { setActivePackage } from '@/redux/features/set-package/set-package';
import { Package } from '@/models/package';
import { useState } from 'react';

export const PackagesList = () => {
  const [activePackageId, setActivePackageId] = useState<string>('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const packagesList = useAppSelector(selectPackagesList);
  const isFetchingPackage = useAppSelector(selectIsFetchingPackage(activePackageId));

  if (!packagesList.length) {
    return (
      <div>There are no packages</div>
    );
  }

  return (
    <div className='p-4'>
      <AtlusTitle text='Packages' />
      <ol className='list-decimal p-4'>
        {packagesList.map(packageListItem => {
          return (
            <li
              className='cursor-pointer select-none'
              key={packageListItem.id}
              onClick={async () => {
                setActivePackageId(packageListItem.id);
                const res = await dispatch(fetchPackage(packageListItem.id));
                console.log('dispatch fetchPackage response: ', res);

                if (res.payload) {
                  dispatch(setActivePackage(res.payload as Package));
                  router.push(SetPackagePatent);
                }
              }}>
              {packageListItem.title}{isFetchingPackage ? ' - Loading...' : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
