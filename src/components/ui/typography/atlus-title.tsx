import { geologica } from '@/components/ui/theme/fonts';

interface TitleProps {
  text: string;
  className?: string;
}


export const AtlusTitle = ({ text, className }: TitleProps) => {
  return (
    <h3
      className={`${geologica.className} ${className} text-[20px] md:text-[28px] leading-[35px] text-soft-black`}
    >
      {text}
    </h3>
  );
};
