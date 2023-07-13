import { NoPatents } from '@/app/set-package/(pages)/patent/components/no-patents';
import { AtlusModal } from '@/components/ui/modal/atlus-modal';

export default async function PatentPage() {
  return (
    <div>
      <NoPatents />
      <AtlusModal isOpen={true}>
        Modal Package
      </AtlusModal>
    </div>
  );
}
