'use client';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { resetSetPackageState } from '@/redux/features/set-package/set-package';

interface PackageStateHandlerProps {
  children: ReactNode;
}

export const PackageStateHandler = ({ children }: PackageStateHandlerProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('[Layout:PackageStateHandler] ---------------------------------------------------');
    // dispatch(resetSetPackageState());
    // return () => {
    //   dispatch(resetSetPackageState());
    // };
  }, [dispatch]);

  return <>{children}</>;
};
