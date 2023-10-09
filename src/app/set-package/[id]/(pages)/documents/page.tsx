import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';
import { DocumentsProvider } from '@/app/set-package/[id]/(pages)/documents/components/documents-provider';
import { DocumentsSelector } from '@/app/set-package/[id]/(pages)/documents/components/documents-selector';
import { DocumentsUploader } from '@/app/set-package/[id]/(pages)/documents/components/documents-uploader';
import { DocumentsList } from '@/app/set-package/[id]/(pages)/documents/components/documents-list/documents-list';
import { SetPackageFooter } from '@/app/set-package/components/set-package-footer';
import { DocumentsPageValidator } from '@/app/set-package/[id]/(pages)/documents/documents-page-validator';
import { ViewPackageButton } from '@/app/set-package/components/view-package-button';

export default function DocumentsPage() {
  return (
    <DocumentsPageValidator>
      <AtlusTitle text="Documents" className="!font-normal !text-2xl mb-3" />
      <AtlusSubTitle
        text="Include files and attachments in your package"
        className="!text-base !font-normal !leading-6 mb-6"
      />
      <DocumentsProvider>
        <DocumentsSelector />
        <DocumentsUploader />
        <DocumentsList />
        <SetPackageFooter>
          <ViewPackageButton />
        </SetPackageFooter>
      </DocumentsProvider>
    </DocumentsPageValidator>
  );
}
