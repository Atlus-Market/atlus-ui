'use client';

import { useDownloadDocumentsContext } from '@/app/package/[id]/components/package-documents/download-documents/download-documents-context';
import { TableHeaderTitle } from '@/app/package/[id]/components/package-patents/components/table-header-title';
import { pluralize } from '@/utils/words';

export const DownloadDocumentsLink = () => {
  const { selectedDocumentsIds } = useDownloadDocumentsContext();

  const selectedDocumentsCount = selectedDocumentsIds.length;

  if (selectedDocumentsCount === 0) {
    return <TableHeaderTitle title="Name" />;
  }

  return (
    <a className="text-orange font-medium text-xs md:text-sm cursor-pointer">
      Download {selectedDocumentsCount} {pluralize('file', selectedDocumentsCount)}
    </a>
  );
};
