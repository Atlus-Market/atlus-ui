interface HeaderCellProps {
  title: string;
}

export const HeaderCell = ({ title }: HeaderCellProps) => {
  return (
    <span className="text-dark-grey text-xs leading-5 font-normal">
      {title}
    </span>
  );
};

