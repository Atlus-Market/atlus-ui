'use client';

import { useDownloadDocumentsContext } from '@/app/package/[id]/components/package-documents/download-documents/download-documents-context';
import { TableHeaderTitle } from '@/app/package/[id]/components/package-patents/components/table-header-title';
import { pluralize } from '@/utils/words';
import { useQuery } from '@tanstack/react-query';
import { downloadDataroomFiles } from '@/api/dataroom/download-dataroom-files';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import clsx from 'clsx';

interface DownloadDocumentsLinkProps {
  directoryTreeName: string;
}

export const DownloadDocumentsLink = ({ directoryTreeName }: DownloadDocumentsLinkProps) => {
  const { selectedDocumentsIds } = useDownloadDocumentsContext();
  const selectedDocumentsCount = selectedDocumentsIds.length;

  const { refetch, isFetching } = useQuery({
    queryKey: ['dataroom/files/download', directoryTreeName, selectedDocumentsIds],
    queryFn: () => downloadDataroomFiles(directoryTreeName, { fileIds: selectedDocumentsIds }),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running if no dataroomId
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
        const res = await refetch();
        console.log(res);

        //needed to call charCodeAt so e.g. '3' in FileBinaryString[150] is converted to 51 (ASCII value) instead of 3
        //et my_uint8_array = Uint8Array.from(res.data as string, c => c.charCodeAt(0));
        //note that this uses Uint8Array.from; Array.from won't give a correct file in the end.

        // @ts-ignore
        let blob = new Blob([res.data], { type: 'application/zip' });
        console.log(blob);
        //the [] above is necessary, otherwise it produces a wrong Blob with a wrong size (2182)
        // for the above string, the correct Blob has a size of 868

        let myUrl = window.URL.createObjectURL(blob);

        // download link
        const link = document.createElement('a');
        link.href = myUrl;
        link.setAttribute('download', 'documents.zip');
        document.body.appendChild(link);
        link.click();
        link.remove();
      }}
    >
      Download {selectedDocumentsCount} {pluralize('file', selectedDocumentsCount)}
      {isFetching && <AtlusLoadingSpinner hexColor="#ef503a" size={14} />}
    </a>
  );
};
