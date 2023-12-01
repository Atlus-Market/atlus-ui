'use client';

import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { downloadDataroomFile } from '@/api/dataroom/download-dataroom-file';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { downloadBlobFile } from '@/utils/file';
import { DirectoryTree } from '@/models/dataroom';

interface DownloadSingleFileProps {
  file: DirectoryTree;
  directoryTreeId: string;
  children: ReactNode;
}

export const DownloadSingleFile = ({
  directoryTreeId,
  file,
  children,
}: DownloadSingleFileProps) => {
  const { refetch, isFetching } = useQuery({
    queryKey: ['dataroom/file/download', directoryTreeId, file.id],
    queryFn: () => downloadDataroomFile(directoryTreeId, file.id),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running if no directoryTreeName
  });

  if (isFetching) {
    return <AtlusLoadingSpinner hexColor="#ef503a" size={14} />;
  }

  return (
    <div
      onClick={async () => {
        const response = await refetch();
        const blobFile = response.data;
        if (blobFile) {
          downloadBlobFile(blobFile, file.name);
        }
      }}
    >
      {children}
    </div>
  );
};
