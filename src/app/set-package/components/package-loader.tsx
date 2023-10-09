'use client';
import { ReactNode, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchPackage } from '@/redux/features/packages/thunks/get-package.thunks';
import { selectPackage } from '@/redux/features/set-package/selectors/set-package.selectors';
import { resetSetPackageState, setActivePackage } from '@/redux/features/set-package/set-package';
import { Package } from '@/models/package';
import { AbortThunkRequest } from '@/types';
import { AtlusSplashLoader } from '@/components/ui/splash-loader/atlus-splash-loader';

interface PackageLoaderProps {
  children: ReactNode;
}

export const PackageLoader = ({ children }: PackageLoaderProps) => {
  const params = useParams();
  const packageId = params.id;
  const dispatch = useAppDispatch();
  const activePackage = useAppSelector(selectPackage);
  const isCreatingPackage = packageId === 'new';

  useEffect(() => {
    let mounted = true;
    dispatch(resetSetPackageState());

    if (!packageId || isCreatingPackage) {
      return;
    }

    let abort: AbortThunkRequest;

    const loadPackage = async () => {
      // @ts-ignore
      const thunkResponse = dispatch(fetchPackage(packageId));
      abort = thunkResponse.abort;
      const res = await thunkResponse;
      const atlusPackage = res.payload as Package;
      if (atlusPackage && mounted) {
        dispatch(setActivePackage(atlusPackage));
      }
    };

    loadPackage();

    return () => {
      mounted = false;
      abort?.();
    };
  }, [dispatch, packageId, isCreatingPackage]);

  if (!isCreatingPackage && !activePackage) {
    return <AtlusSplashLoader />;
  }

  return <>{children}</>;
};
