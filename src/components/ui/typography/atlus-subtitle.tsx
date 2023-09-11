import { inter } from '@/components/ui/theme/fonts';

interface TitleProps {
  text: string;
  className?: string;
}

export const AtlusSubTitle = ({ text, className }: TitleProps) => {
  return <h3 className={`text-[13px] md:text-[18px] ${className} ${inter.className}`}>{text}</h3>;
};
