'use client';

import { MouseEvent, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PackagePageUrl } from '@/constants/routes';

interface PackageLinkProps {
  children: ReactNode;
}

export const PackageLink = ({ children }: PackageLinkProps) => {
  const router = useRouter();

  const onClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      e?.stopPropagation();
      const target = e?.target as HTMLElement;
      const dataSet = target?.closest<HTMLElement>('[data-package-id]')?.dataset;
      if (dataSet && dataSet.packageId) {
        router.push(PackagePageUrl(dataSet.packageId));
      }
    },
    [router]
  );

  return (
    <div onClick={onClick} className="hover:cursor-pointer">
      {children}
    </div>
  );
};
