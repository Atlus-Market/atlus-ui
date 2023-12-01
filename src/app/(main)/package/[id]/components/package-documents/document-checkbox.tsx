'use client';

import { AtlusCheckbox } from '@/components/ui/checkbox/atlus-checkbox';
import { useDownloadDocumentsContext } from '@/app/(main)/package/[id]/components/package-documents/download-documents/use-download-documents-context';

interface DocumentsCheckboxProps {
  fileId: string;
}

export const DocumentCheckbox = ({ fileId }: DocumentsCheckboxProps) => {
  const { selectedDocumentsIds, addDocument, removeDocument } = useDownloadDocumentsContext();
  const isSelected = selectedDocumentsIds.includes(fileId);
  return (
    <AtlusCheckbox
      id={fileId}
      checked={isSelected}
      onChange={e => {
        if (isSelected) {
          removeDocument(fileId);
        } else {
          addDocument(fileId);
        }
      }}
    />
  );
};
