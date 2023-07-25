import {
  AddPatentsModal
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-modal';
import { PatentsList } from '@/app/set-package/(pages)/patent/components/patents-list/patents-list';

export default async function PatentPage() {
  return (
    <div>
      <PatentsList />
      <AddPatentsModal />
    </div>
  );
}
