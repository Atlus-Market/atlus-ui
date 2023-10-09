'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectIsFetchingPackage,
  selectPackagesList,
} from '@/redux/features/packages/selectors/packages.selectors';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { useRouter } from 'next/navigation';
import { PackagePageUrl } from '@/constants/routes';
import { Fragment, useState } from 'react';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';

export const PackagesList = () => {
  const [activePackageId, setActivePackageId] = useState<string>('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const packagesList = useAppSelector(selectPackagesList);
  const isFetchingPackage = useAppSelector(selectIsFetchingPackage(activePackageId));

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
              {/*<div className="cursor-pointer select-none">*/}
              <div>
                <Link href={PackagePageUrl(packageListItem.id)}>
                  <AtlusButton variant="clear">{packageListItem.title}</AtlusButton>
                </Link>
              </div>

              <Link href={`/set-package/${packageListItem.id}/patents`}>
                <AtlusButton
                  variant="clear"
                  // onClick={async () => {
                  //   setActivePackageId(packageListItem.id);
                  //   // @ts-ignore
                  //   const res = await dispatch(fetchPackage(packageListItem.id));
                  //   console.log('dispatch fetchPackage response: ', res);
                  //
                  //   if (res.payload) {
                  //     dispatch(setActivePackage(res.payload as Package));
                  //     router.push(SetPackagePatent);
                  //   }
                  // }}
                  // isLoading={isFetchingPackage && activePackageId === packageListItem.id}
                >
                  Edit
                </AtlusButton>
              </Link>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
