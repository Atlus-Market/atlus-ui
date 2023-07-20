import clsx from 'clsx';

interface RowCellProps {
  text: string;
  className?: string;
}

export const RowCell = ({ text, className }: RowCellProps) => {
  return (
    <span className={clsx(
      'text-soft-black text-sm leading-5 font-normal',
      className
    )}>
      {text}
    </span>
  );
};

