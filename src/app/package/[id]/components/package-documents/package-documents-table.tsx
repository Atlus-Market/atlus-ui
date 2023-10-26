import { Dataroom } from '@/models/dataroom';
import { Fragment } from 'react';
import { FileName } from '@/components/common/file/file-name';
import clsx from 'clsx';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { DownloadDocumentsProvider } from '@/app/package/[id]/components/package-documents/download-documents/download-documents-provider';
import { DocumentCheckbox } from '@/app/package/[id]/components/package-documents/document-checkbox';
import { DocumentsCheckboxHeader } from '@/app/package/[id]/components/package-documents/documents-checkhox-header';
import { DownloadDocumentsLink } from '@/app/package/[id]/components/package-documents/download-documents/download-documents-link';
import './package-documents-table.css';
import { DownloadSingleFile } from '@/app/package/[id]/components/package-documents/download-documents/download-single-file';
import { HiDownload } from 'react-icons/hi';

interface PackageDocumentsTableProps {
  dataroom: Dataroom;
}

const outlineVariantActiveColor = 'bg-[#F5F5F5]';
const cellClassnames = 'py-3 md:py-6';

const MIN_FILES_TO_SHOW = 5;

export const PackageDocumentsTable = ({ dataroom }: PackageDocumentsTableProps) => {
  const files = dataroom.directoryTree.children;
  const allFileIds = files.map(file => file.id);
  const diffCountToShow = files.length - MIN_FILES_TO_SHOW;

  if (!files.length) {
    return <span className="text-soft-black text-sm md:text-base">No documents uploaded</span>;
  }

  return (
    <div>
      <DownloadDocumentsProvider>
        <div className="grid grid-cols-[44px_minmax(100px,_1fr)_auto] grid-rows-[40px] md:grid-rows-[44px]">
          <input type="checkbox" id="show" className="hidden" />
          <div
            className={clsx(
              'flex items-center justify-center bg-light-grey rounded-tl-lg rounded-bl-lg'
            )}
          >
            <DocumentsCheckboxHeader allFileIds={allFileIds} />
          </div>
          <div className="col-span-2 flex items-center bg-light-grey rounded-tr-lg rounded-br-lg">
            <DownloadDocumentsLink directoryTreeId={dataroom.directoryTree.name} />
          </div>
          {files.map((file, index) => {
            const isLastRow = index + 1 === files.length;
            const borderBottomClassname = !isLastRow ? 'md:border-b md:border-light-grey' : '';
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
                  <DocumentCheckbox fileId={file.id} />
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
                  <DownloadSingleFile directoryTreeId={dataroom.directoryTree.name} file={file}>
                    <button className="flex items-center gap-[10px]">
                      <HiDownload className="text-dark-grey" size={20} />
                      <span className="hidden md:inline-block text-dark-grey text-[15px] font-semibold">
                        Download
                      </span>
                    </button>
                  </DownloadSingleFile>
                </div>
              </Fragment>
            );
          })}

          {/* It needs to be part of the table in order to be selected with the hidden input */}
          {diffCountToShow > 0 && (
            <div className="col-span-3">
              <label
                htmlFor="show"
                className={clsx(
                  'mt-4 inline-block cursor-pointer',
                  // Add styles to the button
                  '[&:hover>*]:bg-[var(--atlus-button-outline-hover)]',
                  '[&:active>*]:!bg-[var(--atlus-button-outline-active)]'
                )}
              >
                <AtlusButton
                  variant="outline"
                  color="black"
                  className="pointer-events-none select-none atlus-btn-45"
                >
                  <span className="show-more">Show {diffCountToShow} more</span>
                  <span className="show-less">Show less</span>
                </AtlusButton>
              </label>
            </div>
          )}
        </div>
      </DownloadDocumentsProvider>
    </div>
  );
};
