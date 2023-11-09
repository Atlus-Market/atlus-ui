import clsx from 'clsx';

interface UserInfoFullNameProps {
  fullName: string;
  className?: string;
}

export const UserInfoFullName = ({ fullName, className }: UserInfoFullNameProps) => {
  return (
    <span
      className={clsx(
        'text-base md:text-lg text-black font-normal mb-1 md:mb-[2px] block leading-none',
        className
      )}
    >
      {fullName}
    </span>
  );
};
