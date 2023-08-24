import './documents-table.css';
import { DirectoryTree } from '@/models/dataroom';
import { Fragment } from 'react';
import { parseGMTDate } from '@/utils/date';
import format from 'date-fns/format';
import { FileName } from '@/components/common/file/file-name';
import { DocumentVisibility } from '@/app/set-package/(pages)/documents/components/documents-list/document-visibility';
import { RemoveDocumentButton } from '@/app/set-package/(pages)/documents/components/documents-list/remove-document-button';

interface DocumentsTableProps {
  dataroom: Dataroom;
  onDocumentChanged?: (documentId: string) => void;
}

const formatUploadedDate = (gmtString: string): string => {
  const uploadedDate = parseGMTDate(gmtString);
  return uploadedDate ? format(uploadedDate, 'LLL dd, yyyy') : '-';
};

export const DocumentsTable = ({
  dataroom,
  onDocumentChanged,
}: DocumentsTableProps) => {
  const documents = dataroom.directoryTree.children.filter(
    directory => directory.type === 'file'
  );

  return (
    <div className="documents-grid-scroller">
      <div className="documents-grid">
        <div className="grid-header grid-first-header-col">Name</div>
        <div className="grid-header">Date uploaded</div>
        <div className="grid-header">Visibility</div>
        <div className="grid-header grid-last-header-col"> </div>
        {documents.map(document => (
          <Fragment key={document.id}>
            <div className="grid-entry">
              <FileName fileName={document.name} fileSize={document.size} />
            </div>
            <div className="grid-entry">
              <span className="text-soft-black text-sm">
                {formatUploadedDate(document.dateUploaded)}
              </span>
            </div>
            <div className="grid-entry">
              <DocumentVisibility
                dataroomId={dataroom.directoryTree.name}
                documentId={document.id}
                isPrivate={document.private}
                onDocumentVisibilityChanged={() =>
                  onDocumentChanged?.(document.id)
                }
              />
            </div>
            <div className="grid-entry flex">
              <RemoveDocumentButton
                dataroomId={dataroom.id}
                documentId={document.id}
              />
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
