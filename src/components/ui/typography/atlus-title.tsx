import { Geologica } from 'next/font/google';

interface TitleProps {
  text: string;
  className?: string;
}

const geologica = Geologica({ subsets: ['latin'], fallback: ['sans-serif'] });

export const AtlusTitle = ({ text, className }: TitleProps) => {
  return (
    <h3
      className={`${geologica.className} ${className} text-[18px] md:text-[28px] leading-[35px] text-soft-black`}
    >
      {text}
    </h3>
  );
};
