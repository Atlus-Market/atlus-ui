'use client';

import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectPackageDataroom } from '@/redux/features/set-package/selectors/documents.selectors';
import { DocumentsTable } from '@/app/(main)/set-package/[id]/(pages)/documents/components/documents-list/documents-table';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { toggleDocumentVisibility } from '@/redux/features/set-package/set-package';

export const DocumentsList = () => {
  const dataroom = useAppSelector(selectPackageDataroom);
  const hasDocuments = dataroom && dataroom.directoryTree.children.length > 0;
  const dispatch = useAppDispatch();

  return (
    <div className="mt-[40px]">
      <AtlusTitle text="Attached files" className="!text-lg !font-normal mb-3" />
      {!hasDocuments ? (
        <div className="leading-none">
          <span className="text-dark-grey text-sm leading-5">No files in this package yet</span>
        </div>
      ) : (
        <DocumentsTable
          dataroom={dataroom}
          onDocumentChanged={(documentId: string) => {
            dispatch(toggleDocumentVisibility({ documentId }));
            showSuccessNotification({ text: 'Document updated successfully!' });
          }}
        />
      )}
    </div>
  );
};
