import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import clsx from 'clsx';

interface AtlusModalTitleProps {
  text: string;
  classNames?: string;
}

export const AtlusModalTitle = ({ text, classNames }: AtlusModalTitleProps) => {
  return (
    <AtlusTitle
      text={text}
      className={clsx(
        classNames,
        '!text-xl md:!text-2xl !leading-normal md:!leading-[30px] font-normal'
      )}
    />
  );
};
