import { Geologica } from 'next/font/google';

interface TitleProps {
  text: string;
  className?: string;
}

const geologica = Geologica({ subsets: ['latin'], fallback: ['sans-serif'] });

export const AtlusSubTitle = ({ text, className }: TitleProps) => {
  return (
    <h3
      className={`${geologica.className} ${className} text-[13px] md:text-[18px]`}
    >
      {text}
    </h3>
  );
};
