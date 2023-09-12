import clsx from 'clsx';

interface AtlusDividerProps {
  className?: string;
}

export const AtlusDivider = ({ className }: AtlusDividerProps) => {
  return <div className={clsx(className, 'w-full h-[1px] bg-lightest-grey')} />;
};
