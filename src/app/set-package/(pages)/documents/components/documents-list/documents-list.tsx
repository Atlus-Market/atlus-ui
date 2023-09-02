'use client';

import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { useAppSelector } from '@/redux/hooks';
import { selectPackageDataroom } from '@/redux/features/set-package/selectors/documents.selectors';
import {
  DocumentsTable
} from '@/app/set-package/(pages)/documents/components/documents-list/documents-table';

export const DocumentsList = () => {
  const dataroom = useAppSelector(selectPackageDataroom);
  const hasDocuments = dataroom && dataroom.directoryTree.children.length > 0;

  return (
    <div className='mt-[40px]'>
      <AtlusTitle text='Attached files' className='!text-lg !font-normal mb-3' />
      {!hasDocuments ?
        <div className='leading-none'>
          <span className='text-dark-grey text-sm leading-5'>No files in this package yet</span>
        </div> :
        <DocumentsTable
          dataroom={dataroom}
        />
      }
    </div>
  );
};
