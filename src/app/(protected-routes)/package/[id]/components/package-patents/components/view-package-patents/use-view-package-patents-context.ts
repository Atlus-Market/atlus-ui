import { useContext } from 'react';
import { ViewPackagePatentsContext } from '@/app/(protected-routes)/package/[id]/components/package-patents/components/view-package-patents/view-package-patents-provider';

export const useViewPackagePatentsContext = () => {
  const context = useContext(ViewPackagePatentsContext);

  if (!context) {
    throw new Error(
      'useViewPackagePatentsContext must be used within the ViewPackagePatentsProvider'
    );
  }

  return context;
};
