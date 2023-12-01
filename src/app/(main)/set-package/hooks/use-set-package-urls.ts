'use client';

import { useMemo } from 'react';
import {
  SetNewPackageParam,
  SetPackageDocuments,
  SetPackagePackageDetails,
  SetPackagePatent,
} from '@/constants/routes';
import { useParams } from 'next/navigation';

export const useSetPackageUrls = () => {
  const params = useParams();
  const packageId = (params.id as string) ?? SetNewPackageParam;

  return useMemo(() => {
    return {
      patents: SetPackagePatent(packageId),
      packageDetails: SetPackagePackageDetails(packageId),
      documents: SetPackageDocuments(packageId),
    };
  }, [packageId]);
};
