import './documents-table.css';
import { DirectoryTree } from '@/models/dataroom';
import { Fragment } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import {
  dropdownPrivateOption,
  visibilityOptions
} from '@/components/common/dropdown/visibility-options';
import { AtlusDropdownList } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { parseGMTDate } from '@/utils/date';
import format from 'date-fns/format';
import { FileName } from '@/components/common/file/file-name';

interface DocumentsTableProps {
  dataroom: Dataroom;
  onDocumentChanged?: (documentId: string) => void;
}

const formatUploadedDate = (gmtString: string): string => {
  const uploadedDate = parseGMTDate(gmtString);
  return uploadedDate ? format(uploadedDate, 'LLL dd, yyyy') : '-';
};

export const DocumentsTable = ({ dataroom }: DocumentsTableProps) => {
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
              <FileName fileName={document.name} fileSize={document.size} />
            </div>
            <div className='grid-entry'>
              <span
                className='text-soft-black text-sm'>{formatUploadedDate(document.dateUploaded)}</span>
            </div>
            <div className='grid-entry'>
              <AtlusDropdownList
                placeholder='Visibility'
                name='visibility'
                options={visibilityOptions}
                showDropdownIndicator={true}
                isSearchable={false}
                size='small'
                defaultValue={dropdownPrivateOption.value}
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
    </>
  );
};
