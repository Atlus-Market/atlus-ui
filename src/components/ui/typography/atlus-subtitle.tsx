interface TitleProps {
  text: string;
  className?: string;
}

export const AtlusSubTitle = ({ text, className }: TitleProps) => {
  return <h3 className={`${className} text-[13px] md:text-[18px]`}>{text}</h3>;
};
