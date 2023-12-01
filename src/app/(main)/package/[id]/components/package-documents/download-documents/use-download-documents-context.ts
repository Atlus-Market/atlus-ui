import { useContext } from 'react';
import { DownloadDocumentsContext } from '@/app/(main)/package/[id]/components/package-documents/download-documents/download-documents-provider';

export const useDownloadDocumentsContext = () => {
  const context = useContext(DownloadDocumentsContext);

  if (!context) {
    throw new Error(
      'useDownloadDocumentsContext must be used within the DownloadDocumentsProvider'
    );
  }

  return context;
};
