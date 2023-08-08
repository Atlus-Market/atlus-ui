import {
  AddPatentsModal
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-modal';
import {
  PatentsFamilyList
} from '@/app/set-package/(pages)/patent/components/patents-family-list/patents-family-list';
import {
  SetPatentModal
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/set-patent-modal/set-patent-modal';

export default async function PatentPage() {
  return (
    <div>
      <PatentsFamilyList />
      <AddPatentsModal />
    </div>
  );
}
