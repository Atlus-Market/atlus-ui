'use client';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setPackagesList } from '@/redux/features/packages/packages';
import { useGetUserPackages } from '@/hooks/data/use-get-user-packages';

interface PackagesListProviderProps {
  children: ReactNode;
}

export const PackagesListProvider = ({ children }: PackagesListProviderProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, data, error } = useGetUserPackages();

  useEffect(() => {
    if (data?.packages) {
      dispatch(setPackagesList(data.packages));
    }
  }, [data, dispatch]);

  if (error) {
    console.log(error);
    return <div>Error while loading packages</div>;
  }

  if (isLoading) {
    return <div>Loading packages...</div>;
  }

  return <>{children}</>;
};
