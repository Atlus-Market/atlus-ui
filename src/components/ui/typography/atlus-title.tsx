import clsx from 'clsx';

interface TitleProps {
  text: string;
  className?: string;
}

export const AtlusTitle = ({ text, className }: TitleProps) => {
  return (
    <h3
      className={clsx(
        'font-geologica text-[20px] md:text-[28px] leading-[35px] text-soft-black',
        className
      )}
    >
      {text}
    </h3>
  );
};
