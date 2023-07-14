import { NoPatents } from '@/app/set-package/(pages)/patent/components/no-patents';
import { TestPatent } from '@/app/set-package/(pages)/patent/components/test-patent';
import {
  AddPatentsModal
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-modal';

export default async function PatentPage() {
  return (
    <div>
      <NoPatents />
      <AddPatentsModal />
      <TestPatent />
    </div>
  );
}
