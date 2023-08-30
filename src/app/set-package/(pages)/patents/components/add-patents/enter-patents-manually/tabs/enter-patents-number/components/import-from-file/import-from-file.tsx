'use client';

import { AtlusSelectFile } from '@/components/ui/select-file/atlus-select-file';
import {
  DownloadFileSample
} from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/import-from-file/download-file-sample';

export const ImportFromFile = () => {
  return (
    <div className='[&>*:first-child]:mb-6'>
      <DownloadFileSample />
      <AtlusSelectFile />
    </div>
  );
};
