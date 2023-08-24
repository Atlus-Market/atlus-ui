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
import {
  DocumentsList
} from '@/app/set-package/(pages)/documents/components/documents-list/documents-list';
import { SetPackageFooter } from '@/app/set-package/components/set-package-footer';
import Link from 'next/link';
import { DashboardRoute } from '@/constants/routes';
import { AtlusButton } from '@/components/ui/button/atlus-button';

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
        <DocumentsList />
        <SetPackageFooter>
          <Link href={DashboardRoute}>
            <AtlusButton>View Package</AtlusButton>
          </Link>
        </SetPackageFooter>
      </DocumentsProvider>
    </div>
  );
}
