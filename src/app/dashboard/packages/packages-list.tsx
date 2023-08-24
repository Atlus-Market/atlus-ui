'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectPackagesList } from '@/redux/features/packages/selectors/packages.selectors';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { fetchPackage } from '@/redux/features/packages/thunks/get-package.thunks';
import { useRouter } from 'next/navigation';
import { SetPackagePatent } from '@/constants/routes';

export const PackagesList = () => {
  // const [packageId, setPackageId] = useState<string>('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const packagesList = useAppSelector(selectPackagesList);

  // const { isLoading, data, error, ...rest } = useQuery({
  //   queryKey: ['package', packageId],
  //   queryFn: () => getPackage(packageId),
  //   refetchOnWindowFocus: false,
  //   enabled: !!packageId // disable this query from automatically running if no dataroomId
  // });
  //
  // console.log('data: ', data);

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
                const res = await dispatch(fetchPackage(packageListItem.id));
                console.log('dispatch fetchPackage response: ', res);
                if (!res.payload) {
                  return;
                }
                router.push(SetPackagePatent);
              }}>
              {packageListItem.title}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
