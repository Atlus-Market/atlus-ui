import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { pluralize } from '@/utils/words';
import CircleSVG from '@/public/assets/images/circle.svg';
import Image from 'next/image';

interface HeaderProps {
  familiesCount: number;
  patentsCount: number;
}

export const Header = ({ familiesCount, patentsCount }: HeaderProps) => {
  return (
    <>
      <AtlusTitle text='Patents' className='!font-normal !text-2xl mb-3' />
      <div className='text-sm font-normal text-soft-black leading-5'>
        <span>{familiesCount} {pluralize('family', familiesCount)}</span>
        <Image src={CircleSVG} alt='circle' className='inline-block mx-[11px]' />
        <span>{patentsCount} {pluralize('patent', patentsCount)}</span>
      </div>
    </>
  );
};
