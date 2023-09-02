import './documents-table.css';
import { Dataroom } from '@/models/dataroom';
import { Fragment } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { parseGMTDate } from '@/utils/date';
import format from 'date-fns/format';
import { FileName } from '@/components/common/file/file-name';
import {
  DocumentVisibility
} from '@/app/set-package/(pages)/documents/components/documents-list/document-visibility';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';

interface DocumentsTableProps {
  dataroom: Dataroom;
}

const formatUploadedDate = (gmtString: string): string => {
  const uploadedDate = parseGMTDate(gmtString);
  return uploadedDate ? format(uploadedDate, 'LLL dd, yyyy') : '-';
};

export const DocumentsTable = ({ dataroom }: DocumentsTableProps) => {
  const documents = dataroom.directoryTree.children.filter(directory => directory.type === 'file');

  console.log('dataroom: ', dataroom);
  return (
    <div className='documents-grid-scroller'>
      <div className='documents-grid'>
        <div className='grid-header grid-first-header-col'>Name</div>
        <div className='grid-header'>Date uploaded</div>
        <div className='grid-header'>Visibility</div>
        <div className='grid-header grid-last-header-col'>{' '}</div>
        {documents.map(document => (
          <Fragment key={document.name}>
            <div className='grid-entry'>
              <FileName fileName={document.name} fileSize={document.size} />
            </div>
            <div className='grid-entry'>
              <span
                className='text-soft-black text-sm'>{formatUploadedDate(document.dateUploaded)}</span>
            </div>
            <div className='grid-entry'>
              <DocumentVisibility
                dataroomId={dataroom.directoryTree.name}
                documentId={document.id}
                isPrivate={document.private}
                onDocumentChanged={() => {
                  showSuccessNotification({ text: 'Document updated successfully!' });
                }}
              />
            </div>
            <div className='grid-entry flex'>
              <button>
                <HiOutlineX />
              </button>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
