'use client';

import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectPackage,
  selectPackagePatents,
} from '@/redux/features/set-package/selectors/set-package.selectors';
import { setPackagePatents } from '@/redux/features/set-package/set-package';
import { getPatentsSimpleBulk } from '@/api/patents/get-patents-simple-bulk';

interface PatentsProviderProps {
  children: ReactNode;
}

export const PatentsProvider = ({ children }: PatentsProviderProps) => {
  const [hasLoadPatents, setHasLoadPatents] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const activePackage = useAppSelector(selectPackage);
  const patents = useAppSelector(selectPackagePatents);
  const packagePatentIds = activePackage?.patents;

  const patentsToFetch = useMemo<string[]>(() => {
    return (packagePatentIds ?? []).map(patent => patent.publicationNumber);
  }, [packagePatentIds]);

  console.log('patentsToFetch: ', patentsToFetch);

  const hasPatentsToFetch = patentsToFetch.length > 0;

  const { isLoading, data, error } = useQuery({
    queryKey: ['patents', patentsToFetch],
    queryFn: () => getPatentsSimpleBulk({ ids: patentsToFetch }),
    enabled: !hasLoadPatents,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (hasLoadPatents) {
      return;
    }
    if (data?.patents) {
      setHasLoadPatents(true);
      dispatch(setPackagePatents(data.patents));
    }
  }, [data, dispatch]);

  if (error) {
    console.log(error);
    return <div>Error while loading patents</div>;
  }

  if (!hasLoadPatents && isLoading) {
    return <div>Loading patents...</div>;
  }

  return <>{children}</>;
};
