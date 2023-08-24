'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { SetPackagePatent } from '@/constants/routes';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveDataroom } from '@/redux/features/set-package/selectors/documents.selectors';

export interface DocumentsPageValidatorProps {
  children: ReactNode;
}

export const DocumentsPageValidator = ({ children }: DocumentsPageValidatorProps) => {
  const router = useRouter();
  const dataroomId = useAppSelector(selectActiveDataroom) ?? '';

  if (!dataroomId) {
    router.push(SetPackagePatent);
    return null;
  }

  return (
    <>{children}</>
  );
};
