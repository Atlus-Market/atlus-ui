interface TableHeaderTitleProps {
  title: string;
}

export const TableHeaderTitle = ({ title }: TableHeaderTitleProps) => {
  return <span className="font-sm text-dark-grey font-normal">{title}</span>;
};
