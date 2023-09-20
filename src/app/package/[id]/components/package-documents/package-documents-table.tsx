import { Dataroom } from '@/models/dataroom';
import { Fragment } from 'react';
import { AtlusCheckbox } from '@/components/ui/checkbox/atlus-checkbox';
import { FileName } from '@/components/common/file/file-name';
import { HiDownload } from 'react-icons/hi';
import clsx from 'clsx';
import { TableHeaderTitle } from '@/app/package/[id]/components/package-patents/components/table-header-title';
import { AtlusButton } from '@/components/ui/button/atlus-button';

interface PackageDocumentsTableProps {
  dataroom: Dataroom;
}

const cellClassnames = 'py-3 md:py-6';

const MIN_FILES_TO_SHOW = 5;

export const PackageDocumentsTable = ({ dataroom }: PackageDocumentsTableProps) => {
  const files = dataroom.directoryTree.children;
  const minFilesToShow = files.slice(0, MIN_FILES_TO_SHOW);
  const diffCountToShow = files.length - MIN_FILES_TO_SHOW;

  return (
    <div>
      <div className="grid grid-cols-[44px_minmax(100px,_1fr)_auto] grid-rows-[40px] md:grid-rows-[44px]">
        <div
          className={clsx('flex items-center justify-center bg-peach rounded-tl-lg rounded-bl-lg')}
        >
          <AtlusCheckbox />
        </div>
        <div className="col-span-2 flex items-center bg-peach rounded-tr-lg rounded-br-lg">
          <TableHeaderTitle title="Name" />
        </div>
        {minFilesToShow.map((file, index) => {
          const isLastRow = index + 1 === files.length;
          const borderBottomClassname = !isLastRow ? 'md:border-b md:border-peach' : '';
          return (
            <Fragment key={file.id}>
              <div
                className={clsx(
                  cellClassnames,
                  borderBottomClassname,
                  'flex items-center justify-center'
                )}
              >
                <AtlusCheckbox />
              </div>
              <div className={clsx(cellClassnames, borderBottomClassname)}>
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
      </div>
      {diffCountToShow > 0 && (
        <AtlusButton variant="outline" className="mt-4">
          Show {diffCountToShow} more
        </AtlusButton>
      )}
    </div>
  );
};
