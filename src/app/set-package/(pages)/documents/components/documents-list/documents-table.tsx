import './documents-table.css';
import { DirectoryTree } from '@/models/dataroom';
import { Fragment } from 'react';
import { FileName } from '@/app/set-package/(pages)/documents/components/documents-list/file-name';
import { HiOutlineX } from 'react-icons/hi';
import { visibilityOptions } from '@/components/common/dropdown/visibility-options';
import { HiOutlineLockClosed } from 'react-icons/hi2';
import { AtlusDropdownList } from '@/components/ui/dropdown-list/atlus-dropdown-list';

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
            <div className='grid-entry'>
              <AtlusDropdownList
                placeholder='Visibility'
                name='visibility'
                options={visibilityOptions}
                leftIcon={<HiOutlineLockClosed size={16} />}
                showDropdownIndicator={true}
                isSearchable={false}
                size="small"
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
