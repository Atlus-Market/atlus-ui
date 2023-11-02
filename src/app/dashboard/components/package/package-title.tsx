import clsx from 'clsx';

interface PackageTitleProps {
  title: string;
  className?: string;
}

export const PackageTitle = ({ title, className }: PackageTitleProps) => {
  return (
    <span
      className={clsx(
        'text-black text-13 md:text-base font-normal md:font-medium leading-18',
        className
      )}
    >
      {title}
    </span>
  );
};
