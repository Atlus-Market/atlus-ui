'use client';

import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';
import { fetchPackageAccess } from '@/redux/features/share-package/thunks/get-package-access';

export const SharedWithTab = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPackageAccess());
  }, [dispatch]);

  return <div>SharedWith Tabs</div>;
};
