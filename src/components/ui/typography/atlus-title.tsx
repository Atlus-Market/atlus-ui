interface TitleProps {
  text: string;
  className?: string;
}

export const AtlusTitle = ({ text, className }: TitleProps) => {
  return (
    <h3 className={`${className} text-[18px] md:text-[28px] leading-[35px] text-soft-black`}>
      {text}
    </h3>
  );
};
