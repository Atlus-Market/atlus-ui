import clsx from 'clsx';

interface TableHeaderTitleProps {
  title: string;
  classNames?: string;
}

export const TableHeaderTitle = ({ title, classNames }: TableHeaderTitleProps) => {
  return <span className={clsx('text-xs text-dark-grey font-normal', classNames)}>{title}</span>;
};
