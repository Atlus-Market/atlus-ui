'use client';

import { Package } from '@/models/package';
import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetSetPackageState, setActivePackage } from '@/redux/features/set-package/set-package';
import { selectPackage } from '@/redux/features/set-package/selectors/set-package.selectors';

interface LoadPackageInStoreProps {
  isNewPackage: boolean;
  atlusPackage: Package | undefined;
  children: ReactNode;
}

export const LoadPackageInStore = ({
  atlusPackage,
  isNewPackage,
  children,
}: LoadPackageInStoreProps) => {
  const dispatch = useAppDispatch();
  const activePackage = useAppSelector(selectPackage);

  useEffect(() => {
    // if (!activePackage) {
    //   return;
    // }

    if (!atlusPackage) {
      // dispatch(resetSetPackageState());
      return;
    }

    // If it's same package
    if (atlusPackage.id === activePackage?.id) {
      return;
    }

    if (atlusPackage) {
      console.log('Setting package in store');
      // dispatch(resetSetPackageState());
      dispatch(setActivePackage(atlusPackage));
    }
  }, [activePackage, atlusPackage, dispatch]);

  if (isNewPackage) {
    console.log('Returning isNew Package');
    return <>{children}</>;
  }

  if (atlusPackage && !activePackage) {
    console.log('Returning NULL');
    return null;
  }

  return <>{children}</>;
};
