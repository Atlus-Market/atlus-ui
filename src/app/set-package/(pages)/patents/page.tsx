import {
  AddPatentsModal
} from '@/app/set-package/(pages)/patents/components/add-patents/add-patents-modal';
import {
  PatentsFamilyList
} from '@/app/set-package/(pages)/patents/components/patents-family-list/patents-family-list';
import {
  PatentsListSetPatentHandler
} from '@/app/set-package/(pages)/patents/components/patents-family-list/patents-list-set-patent-handler';
import { PatentsProvider } from '@/app/set-package/(pages)/patents/components/patents-provider';

export default async function PatentPage() {
  return (
    <div>
      <PatentsProvider>
        <PatentsFamilyList />
      </PatentsProvider>
      <AddPatentsModal />
      <PatentsListSetPatentHandler />
    </div>
  );
}
