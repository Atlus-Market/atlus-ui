import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';
import {
  DocumentsProvider
} from '@/app/set-package/(pages)/documents/components/documents-provider';
import {
  DocumentsSelector
} from '@/app/set-package/(pages)/documents/components/documents-selector';
import {
  DocumentsUploader
} from '@/app/set-package/(pages)/documents/components/documents-uploader';

export default async function DocumentsPage() {
  return (
    <div>
      <AtlusTitle text='Documents' className='!font-normal !text-2xl mb-3' />
      <AtlusSubTitle
        text='Include files and attachments in your package'
        className='!text-base !font-normal !leading-6 mb-6'
      />
      <DocumentsProvider>
        <DocumentsSelector />
        <DocumentsUploader />
      </DocumentsProvider>
    </div>
  );
}
