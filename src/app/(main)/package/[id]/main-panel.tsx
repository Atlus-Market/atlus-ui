import 'server-only';
import { Package } from '@/models/package';
import { User } from '@/models/user';
import { Dataroom } from '@/models/dataroom';
import { PackageHeader } from '@/app/(main)/package/[id]/components/package-header';
import { PackageDivider } from '@/app/(main)/package/[id]/components/package-divider';
import { PackageGeneralInfo } from '@/app/(main)/package/[id]/components/general-info/package-general-info';
import { PackageDescription } from '@/app/(main)/package/[id]/components/package-description';
import { PackageIndustries } from '@/app/(main)/package/[id]/components/package-industries';
import { PackageKeywords } from '@/app/(main)/package/[id]/components/package-keyword';
import { PackageSeller } from '@/app/(main)/package/[id]/components/package-seller';
import { PackagePatents } from '@/app/(main)/package/[id]/components/package-patents/package-patents';
import { PackageDocuments } from '@/app/(main)/package/[id]/components/package-documents/package-documents';
import { PackageListedBy } from '@/app/(main)/package/[id]/components/package-owner/package-listed-by';
import { SendMessage } from '@/app/(main)/package/[id]/components/send-message/send-message';
import { PackageProducts } from '@/app/(main)/package/[id]/components/package-products';
import { PackageStandards } from '@/app/(main)/package/[id]/components/package-standards';
import { SepStandard } from '@/models/sep-standard';

interface MainPanelProps {
  atlusPackage: Package;
  dataroom?: Dataroom;
  broker?: User;
  renderLimitedContent: boolean;
  sepStandards: SepStandard[];
}

export const MainPanel = ({
  atlusPackage,
  dataroom,
  broker,
  renderLimitedContent,
  sepStandards,
}: MainPanelProps) => {
  return (
    <div>
      <PackageHeader atlusPackage={atlusPackage} renderLimitedContent={renderLimitedContent} />
      <PackageDivider />
      <PackageGeneralInfo atlusPackage={atlusPackage} />
      <PackageDivider />
      <PackageDescription description={atlusPackage.description} />
      <PackageDivider className="bg-transparent !mt-0" />
      <PackageIndustries atlusPackage={atlusPackage} />
      <PackageDivider className="bg-transparent !mt-0" />
      <PackageKeywords atlusPackage={atlusPackage} />
      {!renderLimitedContent && broker && dataroom && (
        <>
          <PackageDivider className="bg-transparent !mt-0" />
          {atlusPackage.products.length > 0 && (
            <>
              <PackageProducts atlusPackage={atlusPackage} />
              <PackageDivider className="bg-transparent !mt-0" />
            </>
          )}
          <PackageStandards atlusPackage={atlusPackage} sepStandards={sepStandards} />
          <PackageDivider className="bg-transparent !mt-0" />
          <PackageSeller companyName={broker.companyName} />
          <PackageDivider />
          <PackagePatents atlusPackage={atlusPackage} />
          <PackageDivider />
          <PackageDocuments dataroom={dataroom} />
          <PackageDivider />
          <PackageListedBy user={broker} />
          <PackageDivider className="bg-transparent !mt-0" />
          <SendMessage atlusPackage={atlusPackage} />
        </>
      )}
    </div>
  );
};