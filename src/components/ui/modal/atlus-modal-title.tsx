import { AtlusTitle } from '@/components/ui/typography/atlus-title';

interface AtlusModalTitleProps {
  text: string;
}

export const AtlusModalTitle = ({ text }: AtlusModalTitleProps) => {
  return (
    <AtlusTitle text={text} className='!text-2xl font-normal' />
  );
};
