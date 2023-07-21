import { NoPatents } from '@/app/set-package/(pages)/patent/components/no-patents';
import {
  AddPatentsModal
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-modal';

export default async function PatentPage() {
  return (
    <div>
      <NoPatents />
      <AddPatentsModal />
    </div>
  );
}
