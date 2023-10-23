import clsx from 'clsx';

interface AtlusCircleProps {
  className?: string;
  width?: number;
  height?: number;
}

export const AtlusCircle = ({ width = 5, height = 5, className }: AtlusCircleProps) => {
  return <div className={clsx('rounded-[50%]', className)} style={{ width, height }} />;
};
