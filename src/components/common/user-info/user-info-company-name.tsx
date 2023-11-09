import clsx from 'clsx';

interface UserInfoCompanyNameProps {
  companyName: string;
  className?: string;
}

export const UserInfoCompanyName = ({ companyName, className }: UserInfoCompanyNameProps) => {
  return (
    <span className={clsx('text-sm text-dark-grey block leading-none mb-1 md:mb-[2px]', className)}>
      {companyName}
    </span>
  );
};
