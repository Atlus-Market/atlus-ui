interface TitleProps {
  text: string;
  className?: string;
}

export const AtlusSubTitle = ({ text, className }: TitleProps) => {
  return <h3 className={`text-13 md:text-[18px] font-inter ${className}`}>{text}</h3>;
};
