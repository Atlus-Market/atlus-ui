import { geologica } from '@/components/ui/theme/fonts';

interface TitleProps {
  text: string;
  className?: string;
}


export const AtlusSubTitle = ({ text, className }: TitleProps) => {
  return (
    <h3 className={`${geologica.className} ${className} text-[13px] md:text-[18px]`}>
      {text}
    </h3>
  );
};
