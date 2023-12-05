import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';
import AddImage from '@/public/assets/images/add-package.svg';
import Image from 'next/image';
import { OpenAddPatentsModalButton } from '@/app/(main)/set-package/[id]/(pages)/patents/components/open-add-patents-modal-button';

export const NoPatents = () => {
  return (
    <div className="text-center">
      <Image
        src={AddImage}
        priority
        alt="Add patent"
        className="mx-auto mb-1 w-[300px] h-[300px]"
      />
      <AtlusTitle text="Create package" className="mb-2 text-center !text-2xl" />
      <AtlusSubTitle
        text="You don’t have any patents in your package"
        className="mb-9 text-center !text-base !font-normal text-soft-black font-inter"
      />
      <OpenAddPatentsModalButton />
    </div>
  );
};