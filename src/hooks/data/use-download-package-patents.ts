import { useQuery } from '@tanstack/react-query';
import { exportPackageToCSV } from '@/api/package/export-package-to csv';
import { useCallback } from 'react';
import { downloadBlobFile } from '@/utils/file';

export const useDownloadPackagePatents = (packageId: string) => {
  const { refetch, isFetching } = useQuery({
    queryKey: ['package/export-csv', packageId],
    queryFn: () => exportPackageToCSV(packageId),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running if no directoryTreeName
  });

  const exportPackage = useCallback(async () => {
    const response = await refetch();
    const blobFile = response.data;
    if (blobFile) {
      downloadBlobFile(blobFile);
    }
  }, [refetch]);

  return {
    isDownloadingPackagePatents: isFetching,
    downloadPackagePatents: exportPackage,
  };
};
