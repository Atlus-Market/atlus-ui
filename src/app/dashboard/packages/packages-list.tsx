'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectPackagesList } from '@/redux/features/packages/selectors/packages.selectors';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { PackagePageUrl } from '@/constants/routes';
import { Fragment } from 'react';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';

export const PackagesList = () => {
  const packagesList = useAppSelector(selectPackagesList);

  if (!packagesList.length) {
    return <div>There are no packages</div>;
  }

  return (
    <div className="p-4">
      <AtlusTitle text="Packages" />
      <div className="list-decimal grid grid-cols-[max-content_60px]">
        {packagesList.map(packageListItem => {
          return (
            <Fragment key={packageListItem.id}>
              <div className="pr-2">
                <Link href={PackagePageUrl(packageListItem.id)}>
                  <AtlusButton variant="clear">{packageListItem.title}</AtlusButton>
                </Link>
              </div>

              <Link href={`/set-package/${packageListItem.id}/patents`}>
                <AtlusButton variant="clear">Edit</AtlusButton>
              </Link>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
