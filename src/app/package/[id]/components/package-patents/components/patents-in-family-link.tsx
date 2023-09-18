import { pluralize } from '@/utils/words';
import clsx from 'clsx';

interface PatentsInFamilyLinkProps {
  totalPatents: number;
}

export const PatentsInFamilyLink = ({ totalPatents }: PatentsInFamilyLinkProps) => {
  if (totalPatents <= 1) {
    return null;
  }
  const label = `${totalPatents} ${pluralize('patent', totalPatents)} in this family`;
  return (
    <button className={clsx('text-orange', 'text-xs md:text-[13px]', 'font-medium')}>
      {label}
    </button>
  );
};
