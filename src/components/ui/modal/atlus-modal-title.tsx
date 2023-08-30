import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import clsx from 'clsx';

interface AtlusModalTitleProps {
  text: string;
  classNames?: string;
}

export const AtlusModalTitle = ({ text, classNames }: AtlusModalTitleProps) => {
  return (
    <AtlusTitle text={text} className={clsx(classNames, '!text-2xl !leading-[30px] font-normal')} />
  );
};
