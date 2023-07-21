import { AtlusTitle } from '@/components/ui/typography/atlus-title';

interface AtlusModalTitleProps {
  text: string;
}

export const AtlusModalTitle = ({ text }: AtlusModalTitleProps) => {
  return (
    <AtlusTitle text={text} className='!text-2xl !leading-[30px] font-normal' />
  );
};
