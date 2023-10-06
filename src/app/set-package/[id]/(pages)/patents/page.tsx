import { AddPatentsModal } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/add-patents-modal';
import { PatentsFamilyList } from '@/app/set-package/[id]/(pages)/patents/components/patents-family-list/patents-family-list';
import { PatentsListSetPatentHandler } from '@/app/set-package/[id]/(pages)/patents/components/patents-family-list/patents-list-set-patent-handler';
import { PackageLoader } from '@/app/set-package/components/package-loader';

interface SetPackagePageProps {
  params: {
    id: string;
  };
}

export default async function PatentPage({ params }: SetPackagePageProps) {
  return (
    <PackageLoader packageId={params.id}>
      <PatentsFamilyList />
      <AddPatentsModal />
      <PatentsListSetPatentHandler />
    </PackageLoader>
  );
}
