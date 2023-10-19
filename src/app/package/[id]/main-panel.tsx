import 'server-only';
import { Package } from '@/models/package';
import { User } from '@/models/user';
import { Dataroom } from '@/models/dataroom';
import { PackageHeader } from '@/app/package/[id]/components/package-header';
import { PackageDivider } from '@/app/package/[id]/components/package-divider';
import { PackageGeneralInfo } from '@/app/package/[id]/components/general-info/package-general-info';
import { PackageDescription } from '@/app/package/[id]/components/package-description';
import { PackageIndustries } from '@/app/package/[id]/components/package-industries';
import { PackageKeywords } from '@/app/package/[id]/components/package-keyword';
import { PackageSeller } from '@/app/package/[id]/components/package-seller';
import { PackagePatents } from '@/app/package/[id]/components/package-patents/package-patents';
import { PackageDocuments } from '@/app/package/[id]/components/package-documents/package-documents';
import { PackageListedBy } from '@/app/package/[id]/components/package-owner/package-listed-by';
import { SendMessage } from '@/app/package/[id]/components/send-message/send-message';

interface MainPanelProps {
  atlusPackage: Package;
  dataroom?: Dataroom;
  broker?: User;
  userHasAccessToPackage: boolean;
}

export const MainPanel = ({
  atlusPackage,
  dataroom,
  broker,
  userHasAccessToPackage,
}: MainPanelProps) => {
  const renderLimitedContent = userHasAccessToPackage;

  return (
    <div>
      <PackageHeader
        atlusPackage={atlusPackage}
        broker={broker}
        renderLimitedContent={renderLimitedContent}
      />
      <PackageDivider />
      {dataroom && <PackageGeneralInfo atlusPackage={atlusPackage} dataroom={dataroom} />}
      <PackageDivider />
      <PackageDescription description={atlusPackage.description} />
      <PackageDivider className="bg-transparent !mt-0" />
      <PackageIndustries atlusPackage={atlusPackage} />
      <PackageDivider className="bg-transparent !mt-0" />
      <PackageKeywords atlusPackage={atlusPackage} />
      {!renderLimitedContent && broker && dataroom && (
        <>
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
