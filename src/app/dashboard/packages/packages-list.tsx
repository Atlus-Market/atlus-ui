'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectPackagesList } from '@/redux/features/packages/selectors/packages.selectors';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';

export const PackagesList = () => {
  const packagesList = useAppSelector(selectPackagesList);

  if (!packagesList.length) {
    return (
      <div>There are no packages</div>
    );
  }

  return (
    <div className='p-4'>
      <AtlusTitle text='Packages' />
      {packagesList.map(packageListItem => {
        return (
          <div
            className='cursor-pointer select-none'
            key={packageListItem.id}
            onClick={() => {
            }}>
            {packageListItem.title}
          </div>
        );
      })}
    </div>
  );
};
