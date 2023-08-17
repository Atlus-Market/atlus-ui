import './documents-table.css';
import { DirectoryTree } from '@/models/dataroom';
import { Fragment } from 'react';
import { FileName } from '@/app/set-package/(pages)/documents/components/documents-list/file-name';
import { HiOutlineX } from 'react-icons/hi';

interface DocumentsTableProps {
  dataroom: DirectoryTree[];
}

export const DocumentsTable = ({ dataroom }: DocumentsTableProps) => {
  console.log('dataroom: ', dataroom);
  return (
    <div className='documents-grid-scroller'>
      <div className='documents-grid'>
        <div className='grid-header grid-first-header-col'>Name</div>
        <div className='grid-header'>Date uploaded</div>
        <div className='grid-header'>Visibility</div>
        <div className='grid-header grid-last-header-col'>{' '}</div>
        {dataroom.map(document => (
          <Fragment key={document.name}>
            <div className='grid-entry'>
              <FileName fileName={document.name} />
            </div>
            <div className='grid-entry'>
              <span className='text-soft-black text-sm'>Mar 26, 2022</span>
            </div>
            <div className='grid-entry'>Private</div>
            <div className='grid-entry'>
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
