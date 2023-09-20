import { Dataroom } from '@/models/dataroom';
import { Fragment } from 'react';
import { AtlusCheckbox } from '@/components/ui/checkbox/atlus-checkbox';
import { FileName } from '@/components/common/file/file-name';
import { HiDownload } from 'react-icons/hi';
import clsx from 'clsx';
import { TableHeaderTitle } from '@/app/package/[id]/components/package-patents/components/table-header-title';
import { SelectDocumentsProvider } from '@/app/package/[id]/components/package-documents/select-documents-provider';

import './package-documents-table.css';
import { AtlusButton } from '@/components/ui/button/atlus-button';

interface PackageDocumentsTableProps {
  dataroom: Dataroom;
}

const cellClassnames = 'py-3 md:py-6';

const MIN_FILES_TO_SHOW = 5;

export const PackageDocumentsTable = ({ dataroom }: PackageDocumentsTableProps) => {
  const files = dataroom.directoryTree.children;
  const diffCountToShow = files.length - MIN_FILES_TO_SHOW;

  return (
    <div>
      <SelectDocumentsProvider>
        <div className="documents-grid grid grid-cols-[44px_minmax(100px,_1fr)_auto] grid-rows-[40px] md:grid-rows-[44px]">
          <input type="checkbox" id="show" className="hidden" />
          <div
            className={clsx(
              'flex items-center justify-center bg-peach rounded-tl-lg rounded-bl-lg'
            )}
          >
            <AtlusCheckbox />
          </div>
          <div className="col-span-2 flex items-center bg-peach rounded-tr-lg rounded-br-lg">
            <TableHeaderTitle title="Name" />
          </div>
          {files.map((file, index) => {
            const isLastRow = index + 1 === files.length;
            const borderBottomClassname = !isLastRow ? 'md:border-b md:border-peach' : '';
            const toggleClass = index >= MIN_FILES_TO_SHOW ? 'show-more-cells' : '';
            return (
              <Fragment key={file.id}>
                <div
                  className={clsx(
                    cellClassnames,
                    borderBottomClassname,
                    toggleClass,
                    'flex items-center justify-center'
                  )}
                >
                  <AtlusCheckbox />
                </div>
                <div className={clsx(cellClassnames, borderBottomClassname, toggleClass)}>
                  <FileName
                    fileName={file.name}
                    fileSize={file.size}
                    isPrivateFile={file.private}
                    showPrivacyLabel={true}
                  />
                </div>
                <div
                  className={clsx(
                    cellClassnames,
                    borderBottomClassname,
                    toggleClass,
                    'flex items-center justify-end px-[10px]'
                  )}
                >
                  <button className="flex items-center gap-[10px]">
                    <HiDownload className="text-dark-grey" size={20} />
                    <span className="hidden md:inline-block text-dark-grey text-[15px] font-semibold">
                      Download
                    </span>
                  </button>
                </div>
              </Fragment>
            );
          })}

          {/* It needs to be part of the table in order to be selected with the hidden input */}
          {diffCountToShow > 0 && (
            <div className="col-span-3">
              <label htmlFor="show" className="mt-4 inline-block cursor-pointer">
                <AtlusButton variant="outline" className="pointer-events-none select-none">
                  <span className="show-more">Show {diffCountToShow} more</span>
                  <span className="show-less">Show less</span>
                </AtlusButton>
              </label>
            </div>
          )}
        </div>
      </SelectDocumentsProvider>
    </div>
  );
};
