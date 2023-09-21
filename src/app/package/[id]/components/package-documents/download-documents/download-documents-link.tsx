'use client';

import { useDownloadDocumentsContext } from '@/app/package/[id]/components/package-documents/download-documents/download-documents-context';
import { TableHeaderTitle } from '@/app/package/[id]/components/package-patents/components/table-header-title';
import { pluralize } from '@/utils/words';
import { useQuery } from '@tanstack/react-query';
import { downloadDataroomFiles } from '@/api/dataroom/download-dataroom-files';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import clsx from 'clsx';
import { downloadBlobFile } from '@/utils/file';

interface DownloadDocumentsLinkProps {
  directoryTreeId: string;
}

export const DownloadDocumentsLink = ({ directoryTreeId }: DownloadDocumentsLinkProps) => {
  const { selectedDocumentsIds } = useDownloadDocumentsContext();
  const selectedDocumentsCount = selectedDocumentsIds.length;

  const { refetch, isFetching } = useQuery({
    queryKey: ['dataroom/files/download', directoryTreeId, selectedDocumentsIds],
    queryFn: () => downloadDataroomFiles(directoryTreeId, { fileIds: selectedDocumentsIds }),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running if no directoryTreeName
  });

  if (selectedDocumentsCount === 0) {
    return <TableHeaderTitle title="Name" />;
  }

  return (
    <a
      className={clsx(
        'text-orange font-medium text-xs md:text-sm cursor-pointer',
        'flex items-center gap-[10px]'
      )}
      onClick={async () => {
        const response = await refetch();
        const blobFile = response.data;
        if (blobFile) {
          downloadBlobFile(blobFile);
        }
      }}
    >
      Download {selectedDocumentsCount} {pluralize('file', selectedDocumentsCount)}
      {isFetching && <AtlusLoadingSpinner hexColor="#ef503a" size={14} />}
    </a>
  );
};
