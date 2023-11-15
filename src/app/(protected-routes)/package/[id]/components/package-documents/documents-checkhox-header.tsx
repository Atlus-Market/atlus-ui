'use client';

import { AtlusCheckbox } from '@/components/ui/checkbox/atlus-checkbox';
import { useDownloadDocumentsContext } from '@/app/(protected-routes)/package/[id]/components/package-documents/download-documents/use-download-documents-context';

interface DocumentsCheckboxProps {
  allFileIds: string[];
}

export const DocumentsCheckboxHeader = ({ allFileIds }: DocumentsCheckboxProps) => {
  const { selectedDocumentsIds, setDocuments, clear } = useDownloadDocumentsContext();
  const allSelected = selectedDocumentsIds.length === allFileIds.length;
  return (
    <AtlusCheckbox
      checked={allSelected}
      indeterminate={!allSelected && selectedDocumentsIds.length > 0}
      onChange={() => {
        if (allSelected) {
          clear();
        } else {
          setDocuments(allFileIds);
        }
      }}
    />
  );
};
