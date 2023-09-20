'use client';

import { AtlusCheckbox } from '@/components/ui/checkbox/atlus-checkbox';
import { useDownloadDocumentsContext } from '@/app/package/[id]/components/package-documents/download-documents/download-documents-context';

interface DocumentsCheckboxProps {
  allFileIds: string[];
}

export const DocumentsCheckboxHeader = ({ allFileIds }: DocumentsCheckboxProps) => {
  const { selectedDocumentsIds, addDocument, removeDocument } = useDownloadDocumentsContext();
  const allSelected = selectedDocumentsIds.length === allFileIds.length;
  return (
    <AtlusCheckbox
      checked={allSelected}
      indeterminate={!allSelected && selectedDocumentsIds.length > 0}
    />
  );
};
