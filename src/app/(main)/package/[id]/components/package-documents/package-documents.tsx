import { PackageSectionTitle } from '@/app/(main)/package/[id]/components/package-section-title';
import { PackageDocumentsTable } from '@/app/(main)/package/[id]/components/package-documents/package-documents-table';
import { Dataroom } from '@/models/dataroom';

interface PackageDocumentsProps {
  dataroom: Dataroom;
}

export const PackageDocuments = ({ dataroom }: PackageDocumentsProps) => {
  return (
    <div>
      <PackageSectionTitle title="Documents" />
      <PackageDocumentsTable dataroom={dataroom} />
    </div>
  );
};
