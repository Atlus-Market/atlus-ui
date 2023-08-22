'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectPackagesList } from '@/redux/features/packages/selectors/packages.selectors';

export const PackagesList = () => {
  const packagesList = useAppSelector(selectPackagesList);

  if (!packagesList.length) {
    return (
      <div>There are no packages</div>
    );
  }

  return (
    <div>
      {packagesList.map(packageListItem => {
        return (<div key={packageListItem.id}>{packageListItem.title}</div>);
      })
      }
    </div>
  );
};
