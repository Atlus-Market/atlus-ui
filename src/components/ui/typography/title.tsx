interface TitleProps {
  text: string;
  className?: string;
}

export const Title = ({text,className}: TitleProps) => {
  return <h3 className={`${className} text-[28px]`}>{text}</h3>
}
