import { AddPatentsModal } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/add-patents-modal';
import { PatentsFamilyList } from '@/app/set-package/[id]/(pages)/patents/components/patents-family-list/patents-family-list';
import { PatentsListSetPatentHandler } from '@/app/set-package/[id]/(pages)/patents/components/patents-family-list/patents-list-set-patent-handler';

export default function PatentPage() {
  return (
    <>
      <PatentsFamilyList />
      <AddPatentsModal />
      <PatentsListSetPatentHandler />
    </>
  );
}
